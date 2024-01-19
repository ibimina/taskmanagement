import CreateAccountDto from "./dto/create-account.dto";
import AccountService from "./auth.service";
import Controller from "../../interfaces/controller.interface";
import express from "express";
import validationMiddleware from "../../middleware/validate.middleware";

class AccountController implements Controller{
public path ='/account'  
public router= express.Router()  

 public accountService =  new AccountService();

constructor(){
this.initializeRoutes();
}
   
private initializeRoutes(){
this.router.post(`${this.path}/create`,validationMiddleware(CreateAccountDto, true), this.createAccount)
}
private createAccount = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
     const createAccountDto: CreateAccountDto = request.body;
    const user = await this.accountService.createAccount(createAccountDto);
    response.status(201).send(user)
}
}
export default AccountController