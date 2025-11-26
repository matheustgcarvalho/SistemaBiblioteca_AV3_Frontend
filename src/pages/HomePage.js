import { BookForm } from '../Components/BookForm.js';
import { LibraryTable } from '../Components/LibraryTable.js';
import { MainTemplate } from '../Components/MainTemplate.js';

export const HomePage = () => {
  const app = document.getElementById('app');
  app.innerHTML = '';
  const table = LibraryTable();
  const form = BookForm(() => table.refresh());
  const tpl = MainTemplate(form, table);
  app.appendChild(tpl);
  table.refresh();
};
