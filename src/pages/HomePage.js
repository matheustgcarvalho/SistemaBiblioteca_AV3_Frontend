import { BookForm } from '../molecules/BookForm.js';
import { LibraryTable } from '../organisms/LibraryTable.js';
import { MainTemplate } from '../templates/MainTemplate.js';

export const HomePage = () => {
  const app = document.getElementById('app');
  app.innerHTML = '';
  const table = LibraryTable();
  const form = BookForm(() => table.refresh());
  const tpl = MainTemplate(form, table);
  app.appendChild(tpl);
  table.refresh();
};
