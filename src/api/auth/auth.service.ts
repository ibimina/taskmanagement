import accountModel from "../account/schema/account.model";
import CreateAccountDto from "../account/dto/create-account.dto";
import HttpException from "../../exceptions/HttpException";
import * as bcrypt from "bcrypt";
import mongoose from "mongoose";
class AuthService {
  private account = accountModel;
  public connection: mongoose.Connection;

  async createAccount(createAccountDto: CreateAccountDto) {
    try {
      const session = await this.connection.startSession();
      await session.withTransaction(async () => {
        const { email, username, password } = createAccountDto;
        const oldAccount = this.account.findOne({
          email,
        });
        if (oldAccount) {
          new HttpException(400, `User with this email already exists`);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const account = this.account.create({
          email,
          username,
          password: hashedPassword,
        });
        return account;
      });
      session.endSession();
    } catch (error) {}
  }
}
export default AuthService;
