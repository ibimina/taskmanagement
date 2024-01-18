import AuthService from "../auth/auth.service";
import CreateAccountDto from "./dto/create-account.dto";

class AccountService{
    private authService = new AuthService()
   async createAccount(createAccountDto: CreateAccountDto) {
       return this.authService.createAccount(createAccountDto)
    }

}
export default AccountService