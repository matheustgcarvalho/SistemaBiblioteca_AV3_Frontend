import { request } from './http.js';

const api = () => window.CONFIG.API_URL;

const listar = async () => {
  return request(api(), {});
};

const adicionar = async (payload) => {
  return request(api(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
};

const criarColecao = async (nome) => {
  return request(`${api()}/colecao`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });
};

const atualizar = async (codigo, payload) => {
  return request(`${api()}/${codigo}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
};

const deletar = async (codigo) => {
  return request(`${api()}/${codigo}`, { method: 'DELETE' });
};

export { listar, adicionar, criarColecao, atualizar, deletar };
