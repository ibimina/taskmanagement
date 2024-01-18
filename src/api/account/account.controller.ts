import CreateAccountDto from "./dto/create-account.dto";
import AccountService from "./account.service";
import Controller from "../../interfaces/controller.interface";
import express from "express";
import validationMiddleware from "../../middleware/validate.middleware";

class AccountController implements Controller{
public path ='/account'  
public router= express.Router()  
private accountService = new AccountService();
constructor(){
this.initializeRoutes()
}
   
private initializeRoutes(){
this.router.post(`${this.path}/create`,validationMiddleware(CreateAccountDto, true), this.createAccount)
}
public async createAccount (request: express.Request, response: express.Response, next: express.NextFunction){
     const createAccountDto: CreateAccountDto = request.body;
    return await this.accountService.createAccount(createAccountDto)
}
}
export default AccountController