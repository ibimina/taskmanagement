import Controller from "../../interfaces/controller.interface";
import express, { Request, Response } from 'express';

class HomeController implements Controller{
public path ='/'  
public router= express.Router()  
// private accountService = new AccountService();
constructor(){
this.initializeRoutes()
}
   
private initializeRoutes(){
this.router.get(`${this.path}`,this.welcome)
}
public welcome (req:Request,res:Response){
    console.log('you')
    return res.send(`welcome to task management api`)
}
}
export default HomeController