const YOCO_SDK_URL = 'https://js.yoco.com/sdk/v1/yoco-sdk-web.js';
const YOCO_PUBLIC_KEY =
  import.meta.env.VITE_YOCO_PUBLIC_KEY ||
  'pk_test_ed3c54aXKa3xj3RJrxgnA9pTFFAi';

let sdkPromise = null;
function loadSdk() {
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('no window'));
    if (window.YocoSDK) return resolve(window.YocoSDK);
    const s = document.createElement('script');
    s.src = YOCO_SDK_URL;
    s.async = true;
    s.onload = () => (window.YocoSDK ? resolve(window.YocoSDK) : reject(new Error('YocoSDK missing')));
    s.onerror = () => reject(new Error('Failed to load Yoco SDK'));
    document.head.appendChild(s);
  });
  return sdkPromise;
}

export function preloadYocoSdk() {
  return loadSdk().catch(() => null);
}

export async function payWithCard({ amountInCents, description = "Sophia's Clean order" }) {
  const Yoco = await loadSdk();
  return new Promise((resolve) => {
    const yoco = new Yoco({ publicKey: YOCO_PUBLIC_KEY });
    yoco.showPopup({
      amountInCents,
      currency: 'ZAR',
      name: "Sophia's Clean",
      description,
      callback: (result) => resolve(result),
    });
  });
}

export async function chargeOnServer({ token, amountInCents }) {
  const res = await fetch('/api/charge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, amountInCents }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message || data?.error || 'Charge failed');
  return data;
}
