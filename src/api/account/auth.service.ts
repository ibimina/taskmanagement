import HttpException from "exceptions/HttpException";
import mongoose from "mongoose";
import CreateAccountDto from "./dto/create-account.dto";
import accountModel from "./schema/account.model";
import * as bcrypt from "bcrypt";

class AccountService{

 private account = accountModel;
  // public connection: mongoose.Connection;

  public createAccount = async (createAccountDto: CreateAccountDto) => {
    try {
      let account;
      const session = await mongoose.startSession();
      await session.withTransaction(async () => {
        const { email, username, password } = createAccountDto;
        const oldAccount = await this.account.findOne({
          email,
        });
        console.log("old account", oldAccount)
        if (oldAccount) {
          throw new HttpException(400, `User with this email already exists`);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
         account = this.account.create({
          email,
          username,
          password: hashedPassword,
        });
       return account;
      });
      session.endSession();
      return account;
    } catch (error) {
      console.log("error", error)
    }
  }
}
export default AccountService