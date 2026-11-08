import { TokenCount } from '../types';

export interface GenerationResult {
  tokenCount: TokenCount;
}

/**
 * Unified page generation — streams generated website content via the server-side Gemini API.
 * - If currentPageHtml is provided → edit mode (update based on prompt)
 * - If currentPageHtml is null → create mode (generate from scratch)
 *
 * Yields HTML chunks as they stream in.
 * Includes __TOKEN__ and __META__ markers for live statistics and grounding data.
 */
export async function* streamPageGeneration(
  prompt: string,
  currentPageHtml: string | null = null,
  isGrounded: boolean = false,
  abortSignal?: AbortSignal,
  formState?: Array<{ name: string; type: string; value: string }>,
  isMobile: boolean = false,
): AsyncGenerator<string> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        currentPageHtml,
        isGrounded,
        formState,
        isMobile,
      }),
      signal: abortSignal,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Server error (${response.status}): ${errText}`);
    }

    if (!response.body) {
      throw new Error('Empty response from server');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data: ')) continue;
        const dataStr = trimmed.slice(6).trim();
        if (dataStr === '[DONE]') {
          return;
        }
        try {
          const parsed = JSON.parse(dataStr);
          if (parsed.type === 'token') {
            yield `__TOKEN__${JSON.stringify(parsed.data)}`;
          } else if (parsed.type === 'chunk') {
            yield parsed.text;
          } else if (parsed.type === 'meta') {
            yield `__META__${JSON.stringify(parsed.data)}`;
          } else if (parsed.type === 'error') {
            yield `<div class="p-8 text-red-600"><h1>Generation Error</h1><p>${parsed.error}</p></div>`;
          }
        } catch {
          yield dataStr;
        }
      }
    }
  } catch (error: any) {
    if (error?.name === 'AbortError' || abortSignal?.aborted) return;
    console.error('Gemini Stream Error:', error);
    yield `<div class="p-8 text-red-600"><h1>Generation Error</h1><p>${error?.message || error}</p></div>`;
  }
}
