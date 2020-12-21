import addStyling from './addStyling';

const CreateElement = (
  type: string,
  options?: {
    attributes?: { [index: string]: string }
    styling?: { [index: string]: string}
  }
): HTMLElement => {
  const element = document.createElement(type);
  if (!options) return element;

  const {attributes, styling } = options;

  for (const key in attributes) {
    (element as any)[key] = attributes[key];
  }

  if(styling) {
    addStyling(element, styling);
  }
  
  return element;
};

export default CreateElement;
