import express from 'express';
import * as bodyParser from 'body-parser';
import Controller from 'interfaces/controller.interface';
import * as mongoose from 'mongoose';
// import * as mongoose from ''
 
class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.connectToDatabase()
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
 
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller:Controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  private connectToDatabase(){
    const {DATABASE_URL} = process.env
    // mongoose.connect(DATABASE_URL)
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;