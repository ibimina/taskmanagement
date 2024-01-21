import AuthService from "./auth.service";
import Controller from "../../interfaces/controller.interface";
import express from "express";
import validationMiddleware from "../../middleware/validate.middleware";
import TokenData from "interfaces/token.interface";
import {ResetPasswordDto, LoginUserDto, CreateAccountDto} from "./dto"

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
       this.router.get(
      `${this.path}/forgot-password-request`,
      validationMiddleware({email:String}, true),
      this.forgotPasswordRequest
    );
    //  this.router.post(
    //   `${this.path}/forgot-password`,
    //   validationMiddleware(LoginUserDto, true),
    //   this.loginUser
    // );
     this.router.post(
      `${this.path}/reset-password`,
      validationMiddleware(ResetPasswordDto, true),
      this.resetPassword
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

   private forgotPasswordRequest = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const loginUserDto: LoginUserDto = request.body;
    const { user, tokenData } = await this.authService.loginUser(loginUserDto);
    response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
    response.send(user);
  };
  private forgotPassword = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const loginUserDto: LoginUserDto = request.body;
    const { user, tokenData } = await this.authService.loginUser(loginUserDto);
    response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
    response.send(user);
  };
  private resetPassword = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const resetPasswordDto: ResetPasswordDto = request.body;
    const { user, tokenData } = await this.authService.resetPassword(resetPasswordDto);
    response.send(user);
  };
}
export default AuthController;
