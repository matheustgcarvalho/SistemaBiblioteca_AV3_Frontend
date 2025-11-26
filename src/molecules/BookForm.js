import { Input } from '../atoms/Input.js';
import { Button } from '../atoms/Button.js';
import { adicionar, criarColecao } from '../api/livros.js';
import { atualizarLivroFlow, deletarLivroFlow } from '../organisms/LibraryTable.js';
import { showMessage } from './Message.js';

export const BookForm = (onSuccess) => {
  const container = document.createElement('div');
  container.className = 'form-container';

  const title = document.createElement('h1');
  title.textContent = 'Cadastro de Livro';
  container.appendChild(title);

  const titulo = Input('titulo', 'Título do livro', 'text');
  const autor = Input('autor', 'Autor', 'text');
  const ano = Input('ano', 'Ano de publicação', 'number');
  const categoria = document.createElement('select');
  categoria.id = 'categoria';
  categoria.innerHTML = `
    <option value="">Selecione a categoria</option>
    <option value="Fantasia">Fantasia</option>
    <option value="Romance">Romance</option>
    <option value="Distopia">Distopia</option>
    <option value="Ciência">Ciência</option>
    <option value="História">História</option>
    <option value="Tecnologia">Tecnologia</option>
  `;
  const nomeColecao = Input('nomeColecao', 'Nome da coleção (opcional)', 'text');

  const buttons = document.createElement('div');
  buttons.className = 'buttons';

  const btnAdd = Button('Adicionar Livro', {
    onClick: async () => {
      const dados = {
        titulo: titulo.value.trim(),
        autor: autor.value.trim(),
        ano: parseInt(ano.value),
        categoria: categoria.value,
        nomeColecao: nomeColecao.value.trim()
      };
      if (!dados.titulo || !dados.autor || !dados.ano || !dados.categoria) {
        showMessage('Preencha todos os campos obrigatórios!');
        return;
      }
      const res = await adicionar(dados);
      if (res.ok) {
        showMessage(`Livro "${dados.titulo}" adicionado!`, 'green');
        titulo.value = '';
        autor.value = '';
        ano.value = '';
        categoria.value = '';
        nomeColecao.value = '';
      } else {
        showMessage(`Erro (${res.status}): ${res.data?.message || 'Falha ao adicionar livro'}`);
      }
      onSuccess && onSuccess();
    }
  });

  const btnColecao = Button('Criar Coleção', {
    onClick: async () => {
      const nome = prompt('Digite o nome da nova coleção:');
      if (!nome) return;
      const res = await criarColecao(nome);
      if (res.ok) {
        showMessage(`Coleção "${nome}" criada!`, 'green');
      } else {
        showMessage(`Erro (${res.status}): ${res.data?.message || 'Falha ao criar coleção'}`);
      }
      onSuccess && onSuccess();
    }
  });

  const btnListar = Button('Listar', { onClick: onSuccess });
  const btnAtualizar = Button('Atualizar', { onClick: async () => { await atualizarLivroFlow(); onSuccess && onSuccess(); } });
  const btnDeletar = Button('Deletar', { onClick: async () => { await deletarLivroFlow(); onSuccess && onSuccess(); } });

  buttons.appendChild(btnAdd);
  buttons.appendChild(btnColecao);
  buttons.appendChild(btnListar);
  buttons.appendChild(btnAtualizar);
  buttons.appendChild(btnDeletar);

  const msg = document.createElement('div');
  msg.className = 'message';
  msg.id = 'message';

  container.appendChild(titulo);
  container.appendChild(autor);
  container.appendChild(ano);
  container.appendChild(categoria);
  container.appendChild(nomeColecao);
  container.appendChild(buttons);
  container.appendChild(msg);
  return container;
};
