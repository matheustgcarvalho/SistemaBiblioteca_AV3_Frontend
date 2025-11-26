import { register, start } from './router.js';
import { HomePage } from './pages/HomePage.js';

register('/', HomePage);

start();
