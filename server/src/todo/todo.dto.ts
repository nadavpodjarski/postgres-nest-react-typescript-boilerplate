import { IsString, IsBoolean } from 'class-validator';

export class TodoDTO {
  @IsString()
  content: string;

  @IsBoolean()
  completed: boolean;
}
