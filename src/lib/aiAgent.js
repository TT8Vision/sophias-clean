// Opens the embedded BuildMyAgent.io widget. The widget lives inside a Shadow
// DOM and accepts an `open-widget` postMessage on its iframe — that's how the
// vendor's own chat-bubble launcher triggers it.
const HOST_ID = 'ai-chat-widget-host-69c92e602563ef867ab677d2';

function findWidgetIframe() {
  const host = document.getElementById(HOST_ID);
  const root = host?.shadowRoot;
  if (!root) return null;
  return root.querySelector('iframe');
}

function sendOpen(iframe) {
  try {
    iframe.contentWindow?.postMessage({ type: 'open-widget' }, '*');
    return true;
  } catch {
    return false;
  }
}

export function openAIAgent({ retries = 20, intervalMs = 150 } = {}) {
  return new Promise((resolve) => {
    const attempt = (left) => {
      const iframe = findWidgetIframe();
      if (iframe && sendOpen(iframe)) {
        resolve(true);
        return;
      }
      if (left <= 0) {
        resolve(false);
        return;
      }
      setTimeout(() => attempt(left - 1), intervalMs);
    };
    attempt(retries);
  });
}
