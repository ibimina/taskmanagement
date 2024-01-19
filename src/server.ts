import HomeController from './api/home/home.controller';
import AuthController from './api/auth/auth.controller';
import App from './app';
import 'dotenv/config';
const app = new App(
  [
    new AuthController(),
    new HomeController()
  ],
  5000,
);
 
app.listen();