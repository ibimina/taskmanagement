import { IsString } from "class-validator";

class ResetPasswordDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  newPassword: string;
}
export default ResetPasswordDto;
