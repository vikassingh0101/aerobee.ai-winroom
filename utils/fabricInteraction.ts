/**
 * Global Fabric & CTA Interaction Manager
 * Tracks mouse position, inertia, and active CTA hovers across all sections
 */

export interface CTAInfo {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  isHovered: boolean;
  type: string;
}

export interface FabricInteractionState {
  mouseX: number;
  mouseY: number;
  targetMouseX: number;
  targetMouseY: number;
  mouseVelocityX: number;
  mouseVelocityY: number;
  isMouseInside: boolean;
  activeCTA: CTAInfo | null;
  lastMoveTimestamp: number;
}

const state: FabricInteractionState = {
  mouseX: -1000,
  mouseY: -1000,
  targetMouseX: -1000,
  targetMouseY: -1000,
  mouseVelocityX: 0,
  mouseVelocityY: 0,
  isMouseInside: false,
  activeCTA: null,
  lastMoveTimestamp: 0,
};

type Listener = (state: FabricInteractionState) => void;
const listeners = new Set<Listener>();

let initialized = false;
let lastX = -1000;
let lastY = -1000;
let lastTimestamp = 0;

function checkCTAAtPoint(x: number, y: number): CTAInfo | null {
  if (typeof document === 'undefined') return null;
  const el = document.elementFromPoint(x, y) as HTMLElement | null;
  if (!el) return null;

  // Detect buttons, interactive links, wobbly buttons, sketch cards, inputs
  const ctaEl = el.closest(
    'button, a.wobbly-btn, .wobbly-btn, [role="button"], input, a[href^="#"], a[id*="cta"], .sketch-card, .sketch-card-dark'
  ) as HTMLElement | null;

  if (ctaEl) {
    const rect = ctaEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = Math.max(32, Math.hypot(rect.width, rect.height) / 2);
    const tagName = ctaEl.tagName.toLowerCase();

    return {
      x: cx,
      y: cy,
      width: rect.width,
      height: rect.height,
      radius,
      isHovered: true,
      type: tagName,
    };
  }

  return null;
}

function handlePointerMove(e: MouseEvent | TouchEvent) {
  const now = performance.now();
  let clientX = 0;
  let clientY = 0;

  if ('touches' in e && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ('clientX' in e) {
    clientX = (e as MouseEvent).clientX;
    clientY = (e as MouseEvent).clientY;
  } else {
    return;
  }

  const dt = Math.max(1, now - lastTimestamp);
  const vx = (clientX - lastX) / dt;
  const vy = (clientY - lastY) / dt;

  lastX = clientX;
  lastY = clientY;
  lastTimestamp = now;

  state.targetMouseX = clientX;
  state.targetMouseY = clientY;
  state.mouseVelocityX = vx;
  state.mouseVelocityY = vy;
  state.isMouseInside = true;
  state.lastMoveTimestamp = now;

  // Check CTA under cursor
  state.activeCTA = checkCTAAtPoint(clientX, clientY);

  notifyListeners();
}

function handlePointerLeave() {
  state.isMouseInside = false;
  state.activeCTA = null;
  notifyListeners();
}

function handleScroll() {
  // Re-evaluate CTA bounding box if mouse is hovering over an element during scroll
  if (state.isMouseInside && state.targetMouseX >= 0 && state.targetMouseY >= 0) {
    state.activeCTA = checkCTAAtPoint(state.targetMouseX, state.targetMouseY);
    notifyListeners();
  }
}

function notifyListeners() {
  listeners.forEach((fn) => fn(state));
}

export function initFabricInteraction() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  window.addEventListener('mousemove', handlePointerMove, { passive: true });
  window.addEventListener('touchmove', handlePointerMove, { passive: true });
  window.addEventListener('mouseleave', handlePointerLeave, { passive: true });
  window.addEventListener('scroll', handleScroll, { passive: true });
}

export function getFabricInteractionState(): FabricInteractionState {
  return state;
}

export function subscribeFabricInteraction(listener: Listener): () => void {
  initFabricInteraction();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
