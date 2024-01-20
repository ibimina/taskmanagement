import CreateAccountDto from "./dto/create-account.dto";
import AuthService from "./auth.service";
import Controller from "../../interfaces/controller.interface";
import express from "express";
import validationMiddleware from "../../middleware/validate.middleware";
import LoginUserDto from "./dto/login-user.dto";
import TokenData from "interfaces/token.interface";

class AuthController implements Controller {
  public path = "/auth";
  public router = express.Router();

  public authService = new AuthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      validationMiddleware(CreateAccountDto, true),
      this.createAccount
    );
    this.router.get(
      `${this.path}/login`,
      validationMiddleware(LoginUserDto, true),
      this.loginUser
    );
  }
  private createAccount = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const createAccountDto: CreateAccountDto = request.body;
    const { user, tokenData } = await this.authService.createAccount(
      createAccountDto
    );
    response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
    response.status(201).send(user);
  };

  private loginUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const loginUserDto: LoginUserDto = request.body;
    const { user, tokenData } = await this.authService.loginUser(loginUserDto);
    response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
    response.send(user);
  };
  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}
export default AuthController;
