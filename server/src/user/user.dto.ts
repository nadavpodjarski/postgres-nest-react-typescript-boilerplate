import { IsEmail, MinLength } from 'class-validator';

export class UserDTO {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
