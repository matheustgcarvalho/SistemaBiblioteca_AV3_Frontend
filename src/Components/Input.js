export const Input = (id, placeholder, type = 'text') => {
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.placeholder = placeholder;
  input.style.width = '100%';
  input.style.padding = '10px';
  input.style.margin = '6px 0 12px 0';
  return input;
};
