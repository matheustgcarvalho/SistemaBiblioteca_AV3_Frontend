export const Message = () => {
  const div = document.createElement('div');
  div.className = 'message';
  div.id = 'message';
  return div;
};

export const showMessage = (text, color = 'red') => {
  const msg = document.getElementById('message');
  if (!msg) return;
  msg.style.color = color;
  msg.textContent = text;
  setTimeout(() => (msg.textContent = ''), 3000);
};
