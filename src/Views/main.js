import { register, start } from '../Context/router.js';
import { HomePage } from '../pages/HomePage.js';

register('/', HomePage);

start();
