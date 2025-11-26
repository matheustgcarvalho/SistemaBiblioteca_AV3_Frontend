export const MainTemplate = (left, right, actions) => {
  const layout = document.createElement('div');
  layout.className = 'layout';
  if (left) layout.appendChild(left);
  if (right) layout.appendChild(right);
  if (actions) layout.appendChild(actions);
  return layout;
};
