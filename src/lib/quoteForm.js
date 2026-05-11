export const QUOTE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfRG8sAAw50nBfMs4c6m-2libX88m2oNaz5SnyjK06vetvIEw/viewform';

export function openQuoteForm() {
  window.open(QUOTE_FORM_URL, '_blank', 'noopener,noreferrer');
}
