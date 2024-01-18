import HomeController from './api/home/home.controller';
import AccountController from './api/account/account.controller';
import App from './app';
import 'dotenv/config';
const app = new App(
  [
    new AccountController(),
    new HomeController()
  ],
  5000,
);
 
app.listen();