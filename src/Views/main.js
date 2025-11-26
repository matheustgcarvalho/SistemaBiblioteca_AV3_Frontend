import { register, start } from '../Context/router.js';
import { HomePage } from '../Pages/HomePage.js';

register('/', HomePage);

start();
