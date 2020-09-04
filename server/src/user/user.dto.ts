import { IsEmail, Length } from 'class-validator';

export class UserDTO {
  @IsEmail()
  email: string;

  @Length(3, 12)
  password: string;
}
