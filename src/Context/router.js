const routes = {};

const register = (path, handler) => { routes[path] = handler; };

const navigate = (path) => { window.location.hash = path; };

const start = () => {
  const render = () => {
    const path = window.location.hash.replace('#', '') || '/';
    const handler = routes[path] || routes['/'];
    handler();
  };
  window.addEventListener('hashchange', render);
  render();
};

export { register, navigate, start };
