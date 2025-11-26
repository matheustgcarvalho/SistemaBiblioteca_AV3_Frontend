export const Button = (text, { onClick, variant = 'primary' } = {}) => {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.className = variant === 'primary' ? '' : '';
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
};
