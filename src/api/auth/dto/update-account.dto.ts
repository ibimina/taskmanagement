import { IsString } from "class-validator";

class CreateAccount {
    @IsString()
    username: string
     @IsString()
     email: string
}
export default CreateAccount