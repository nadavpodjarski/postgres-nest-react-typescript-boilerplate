import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ITodoDTO } from './todo.dto';

@Controller('/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/all')
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Post('/create')
  createTodo(@Body('content') content: Extract<ITodoDTO, 'content'>) {
    return this.todoService.createTodo(content);
  }

  @Patch('/update')
  updateTodo(@Query('id') id: string, @Body() data: Partial<ITodoDTO>) {
    return this.todoService.updateTodo(id, data);
  }

  @Delete('/delete')
  deleteTodo(@Query('id') id: string) {
    return this.todoService.deleteTodo(id);
  }
}
