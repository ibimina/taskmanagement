import HttpException from "../../exceptions/HttpException";
import mongoose from "mongoose";
import CreateAccountDto from "./dto/create-account.dto";
import accountModel from "./schema/account.model";
import * as bcrypt from "bcrypt";
import LoginUserDto from "./dto/login-user.dto";
import TokenData from "interfaces/token.interface";
import User from "interfaces/user.interface";
import DataStoredInToken from "interfaces/dataStoredInToken.interface";
import * as jwt from "jsonwebtoken";
import { ResetPasswordDto } from "./dto";

class AuthService {
  private account = accountModel;
  public createAccount = async (createAccountDto: CreateAccountDto) => {
    try {
      let createAccount;
      const session = await mongoose.startSession();
      await session.withTransaction(async () => {
        const { email, username, password } = createAccountDto;
        const oldAccount = await this.account.findOne({
          email,
        });
        if (oldAccount) {
          throw new HttpException(400, `User with this email already exists`);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        createAccount = this.account.create({
          email,
          username,
          password: hashedPassword,
        });
        // (await createAccount).save();
        (await createAccount).password = undefined;

        return createAccount;
      });
      session.endSession();
      const tokenData = this.createToken(createAccount);
      return { createAccount, tokenData };
    } catch (error) {
      return error;
    }
  };

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;
      let user = await this.account.findOne({
        email,
      });

      if (!user || !user?.email) {
        throw new HttpException(401, "Wrong credentials provided");
      }
      const isPasswordMatching = await bcrypt.compare(password, user?.password);
      if (!isPasswordMatching) {
        throw new HttpException(401, "Wrong credentials provided");
      }
      user.password = undefined;
      const tokenData = this.createToken(user);
      return { user, tokenData };
    } catch (error) {
      return error;
    }
  }

  public createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const {email, password, newPassword} = resetPasswordDto

    } catch (error) {
      return error;
    }
  }
}
export default AuthService;
