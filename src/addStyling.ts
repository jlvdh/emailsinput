export default (
  element: HTMLElement,
  styles: { [index: string]: string }
): HTMLElement => {
  for (const key in styles) {
    (element as any).style[key] = styles[key];
  }
  return element;
};
