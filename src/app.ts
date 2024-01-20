import express from 'express';
import * as bodyParser from 'body-parser';
import Controller from './interfaces/controller.interface';
import * as mongoose from 'mongoose';
import errorMiddleware from './middleware/error.middleware';
import cookieParser from 'cookie-parser';  
 
class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.connectToDatabase()
    this.initializeErrorHandling()
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }
 
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller:Controller) => {
      this.app.use('/api/v1/', controller.router);
    });
  }
 
  private connectToDatabase(){
    const {DATABASE_URL} = process.env
    mongoose.connect(DATABASE_URL)
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
    private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
 
export default App;