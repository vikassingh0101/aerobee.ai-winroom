import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const MODEL_NAME = 'gemini-3.1-flash-lite';

const SYSTEM_PROMPT = `
You are powered by Gemini 3.1 Flash-Lite, a fast, lightweight model. You generate complete web pages as HTML documents.

STRUCTURE:
Return a full HTML document with a <head> and a <body>:

<html>
<head>
  <title>SiteName - Page Name</title>
  <meta name="color-scheme" content="light">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', sans-serif">
  ...page content...
</body>
</html>

Keep the <head> minimal — just the <title>, <meta name="color-scheme">, and a Google Fonts <link>. Tailwind CSS and scripts are injected automatically.
The <title> format is: "SiteName - PageName" eg. "UKNews - Home".
Set color-scheme to "light" or "dark" — choose whichever suits the site. Use only one.

STYLING:
Use Tailwind CSS utility classes for all styling. Create rich, polished, realistic-looking pages with balanced spacing, refined typography, and accessible contrast.
Use Google Fonts for the site. Include the <link> tag in <head> and apply the font via an inline style on the <body> tag (e.g., style="font-family: 'Playfair Display', serif"). Each site should feel typographically distinct.
For icons, use Material Symbols: <span class="material-symbols-outlined">icon_name</span> (e.g., home, search, settings, favorite, delete, mail, star).
Use emojis generously for visual flair and as image placeholders.
For images, use CSS gradients, inline SVGs, or emoji placeholders.

NAVIGATION:
Use <a href="..."> tags with descriptive path-like hrefs (e.g., href="inbox/message-from-alice", href="settings/notifications").
Every link should have a meaningful href.

INTERACTIVITY:
For actions that change the current page state (e.g., archiving, submitting, toggling), call:
  window.FlashLiteAPI.performAction('Description of intent', 'Optional payload')
Examples:
  <button onclick="FlashLiteAPI.performAction('Archive email 42')">Archive</button>
  <form onsubmit="event.preventDefault(); FlashLiteAPI.performAction('Search', this.q.value)">

CONTENT:
Fill every page with rich, plausible, detailed content. Make it feel like a real website.
`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', model: MODEL_NAME, hasKey: !!process.env.GEMINI_API_KEY });
});

// Streaming generation endpoint
app.post('/api/generate', async (req, res) => {
  const {
    prompt,
    currentPageHtml = null,
    isGrounded = false,
    formState = [],
    isMobile = false,
  } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  const isEdit = currentPageHtml !== null && typeof currentPageHtml === 'string';

  let userPrompt: string;
  if (isEdit) {
    const formStateBlock = formState && formState.length > 0
      ? `\n\nThe user entered the following values into input fields on the previous page:\n${formState.map((f: any) => `- ${f.name || 'unnamed'} (${f.type}): "${f.value}"`).join('\n')}\n`
      : '';
    userPrompt = `
Update this page based on the following.
Instruction: "${prompt}"

Keep the layout and style generally consistent.
Return the complete updated HTML document.${formStateBlock}

CURRENT HTML:
${currentPageHtml}
`;
  } else {
    userPrompt = `
Task: Generate a new web page.
Description: "${prompt}"

Create a complete, detailed, realistic-looking web page based on this description.
`;
  }

  if (isGrounded) {
    userPrompt += `\nIMPORTANT: You have access to Google Search. Use it to find current, accurate data for populating the page content. Always ground the page in search results — use real names, real statistics, real facts from your Google searches.\n`;
  }

  if (isMobile) {
    userPrompt += `\nIMPORTANT: The user is on a MOBILE device with a narrow viewport. Design mobile-first:\n- Use a single-column layout\n- Use responsive Tailwind classes\n- Avoid horizontal scrolling\n- Stack elements vertically\n- Keep navigation simple\n`;
  }

  const config: any = {
    systemInstruction: SYSTEM_PROMPT,
  };

  if (isGrounded) {
    config.tools = [{ googleSearch: {} }];
  }

  try {
    const ai = getAI();

    // Estimate or count input tokens
    let inputTokens = 0;
    try {
      const countResult = await ai.models.countTokens({
        model: MODEL_NAME,
        contents: [
          { role: 'user', parts: [{ text: config.systemInstruction || '' }] },
          { role: 'user', parts: [{ text: userPrompt }] },
        ],
      });
      inputTokens = countResult.totalTokens || 0;
    } catch {
      inputTokens = Math.round(userPrompt.length / 4);
    }

    res.write(`data: ${JSON.stringify({ type: 'token', data: { input: inputTokens, output: 0, isEstimate: true } })}\n\n`);

    const responseStream = await ai.models.generateContentStream({
      model: MODEL_NAME,
      contents: userPrompt,
      config,
    });

    let outputTokens = 0;
    let totalChars = 0;
    let groundingSources: Array<{ title: string; uri: string }> = [];
    let searchEntryPointHtml = '';

    for await (const chunk of responseStream) {
      if (chunk.usageMetadata) {
        if (chunk.usageMetadata.promptTokenCount) {
          inputTokens = chunk.usageMetadata.promptTokenCount;
        }
        outputTokens = chunk.usageMetadata.candidatesTokenCount || 0;
      }

      const groundingMeta = chunk.candidates?.[0]?.groundingMetadata;
      if (groundingMeta?.groundingChunks?.length) {
        groundingSources = groundingMeta.groundingChunks
          .filter((c: any) => c.web?.uri && c.web?.title)
          .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));
      }
      if (groundingMeta?.searchEntryPoint?.renderedContent) {
        searchEntryPointHtml = groundingMeta.searchEntryPoint.renderedContent;
      }

      if (chunk.text) {
        totalChars += chunk.text.length;
        const estimatedOutput = Math.round(totalChars / 4);
        res.write(`data: ${JSON.stringify({ type: 'token', data: { input: inputTokens, output: estimatedOutput, isEstimate: true } })}\n\n`);
        res.write(`data: ${JSON.stringify({ type: 'chunk', text: chunk.text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({
      type: 'meta',
      data: {
        tokenCount: { input: inputTokens, output: outputTokens || Math.round(totalChars / 4) },
        groundingSources,
        searchEntryPointHtml,
      }
    })}\n\n`);

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Generation Error in server:', error);
    res.write(`data: ${JSON.stringify({
      type: 'error',
      error: error?.message || 'Failed to generate page'
    })}\n\n`);
    res.end();
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('{*all}', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
