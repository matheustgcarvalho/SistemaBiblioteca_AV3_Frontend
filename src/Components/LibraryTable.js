import { listar, atualizar, deletar } from '../Services/livros.js';
import { showMessage } from './Message.js';

export const LibraryTable = () => {
  const wrap = document.createElement('div');
  wrap.className = 'biblioteca-container';
  const title = document.createElement('h1');
  title.textContent = 'Biblioteca';
  wrap.appendChild(title);
  const table = document.createElement('table');
  table.id = 'tabelaLivros';
  table.innerHTML = `
    <thead>
      <tr>
        <th>Código</th>
        <th>Título / Coleção</th>
        <th>Autor</th>
        <th>Ano</th>
        <th>Categoria</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  wrap.appendChild(table);

  const tbody = table.querySelector('tbody');

  const renderRows = (colecoes) => {
    tbody.innerHTML = '';
    if (!colecoes || colecoes.length === 0) {
      tbody.innerHTML = "<tr><td colspan='5'>Nenhum livro ou coleção cadastrada.</td></tr>";
      return;
    }
    colecoes.forEach((colecao) => {
      const trColecao = document.createElement('tr');
      trColecao.className = 'colecao';
      trColecao.innerHTML = `<td>-</td><td colspan="4">Coleção: ${colecao.nome}</td>`;
      tbody.appendChild(trColecao);
      if (!colecao.itens || colecao.itens.length === 0) {
        const trVazio = document.createElement('tr');
        trVazio.innerHTML = `<td colspan="5" style="font-style: italic; color: #777; text-align: center;">Vazio.</td>`;
        tbody.appendChild(trVazio);
      } else {
        colecao.itens.forEach((livro) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${livro.codigo}</td>
            <td>↳ ${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.ano}</td>
            <td>${livro.categoria}</td>
          `;
          tbody.appendChild(tr);
        });
      }
    });
  };

  const refresh = async () => {
    tbody.innerHTML = "<tr><td colspan='5'>Carregando...</td></tr>";
    const res = await listar();
    if (res.ok) renderRows(res.data);
    else tbody.innerHTML = `<tr><td colspan='5' style='color:red;'>Erro ao conectar com o Backend</td></tr>`;
  };

  wrap.refresh = refresh;
  return wrap;
};

export const atualizarLivroFlow = async () => {
  const codigo = prompt('Digite o código do livro que deseja atualizar:');
  if (!codigo || isNaN(parseInt(codigo))) {
    showMessage('Código inválido!');
    return;
  }
  const titulo = prompt('Novo título (deixe em branco para não alterar):');
  const autor = prompt('Novo autor (deixe em branco para não alterar):');
  const anoStr = prompt('Novo ano (deixe em branco para não alterar):');
  const categoria = prompt('Nova categoria (deixe em branco para não alterar):');
  const dados = {};
  if (titulo && titulo.trim() !== '') dados.titulo = titulo;
  if (autor && autor.trim() !== '') dados.autor = autor;
  if (anoStr && anoStr.trim() !== '') {
    const ano = parseInt(anoStr);
    if (!isNaN(ano)) dados.ano = ano;
  }
  if (categoria && categoria.trim() !== '') dados.categoria = categoria;
  if (Object.keys(dados).length === 0) {
    showMessage('Nenhum dado fornecido para atualização.');
    return;
  }
  const res = await atualizar(codigo, dados);
  if (res.ok) showMessage(res.data?.message || `Livro ${codigo} atualizado!`, 'green');
  else showMessage(`Erro (${res.status}): ${res.data?.message || 'Falha ao atualizar livro'}`);
};

export const deletarLivroFlow = async () => {
  const codigo = prompt('Digite o código do livro que deseja deletar:');
  if (!codigo || isNaN(parseInt(codigo))) {
    showMessage('Código inválido!');
    return;
  }
  const res = await deletar(codigo);
  if (res.status === 204 || res.ok) showMessage('Livro deletado!', 'green');
  else showMessage(`Erro (${res.status}): ${res.data?.message || 'Falha ao deletar livro'}`);
};
