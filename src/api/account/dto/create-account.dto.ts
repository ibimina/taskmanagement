import { IsString } from "class-validator";

class CreateAccountDto {
    @IsString()
    username: string
     @IsString()
     email: string
     @IsString()
    password: string
}
export default CreateAccountDto