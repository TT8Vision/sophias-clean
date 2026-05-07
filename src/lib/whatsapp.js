export const SOPHIA_WHATSAPP_NUMBER = '27833999974';

export function openBookingChat(context) {
  const intro = "Hi Sophia! I'd love to book a quick call to chat about a clean.";
  const message = context
    ? `${intro}\n\nInterested in: ${context}`
    : intro;
  const url = `https://wa.me/${SOPHIA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
