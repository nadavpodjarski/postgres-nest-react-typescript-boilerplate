import { IsString, IsBoolean } from 'class-validator';
import { UserSO } from 'src/user/user.dto';

export class TodoDTO {
  @IsString()
  content: string;

  @IsBoolean()
  completed: boolean;
}

export type TodoSO = {
  id: string;
  createdOn: Date;
  completed: boolean;
  author: UserSO;
  token?: string;
};
