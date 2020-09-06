import { IsEmail, MinLength } from 'class-validator';

export class UserDTO {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

export type UserSO = {
  id: string;
  createdOn: Date;
  email: string;
  token?: string;
};
