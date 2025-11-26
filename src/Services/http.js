const request = async (url, options) => {
  const res = await fetch(url, options);
  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : null;
  return { ok: res.ok, status: res.status, data };
};

export { request };
