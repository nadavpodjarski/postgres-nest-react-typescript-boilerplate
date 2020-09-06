import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import { TodoDTO } from './todo.dto';
import { AuthGuard } from 'src/shared/auth.guard';

@Controller('todo')
@UseGuards(new AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/all')
  getAllTodos(@Req() req) {
    const userId = req.user.id;
    return this.todoService.getAllTodos(userId);
  }

  @Post('/create')
  createTodo(
    @Req() req,
    @Body('content') content: Extract<TodoDTO, 'content'>,
  ) {
    const userId = req.user.id;
    return this.todoService.createTodo(userId, content);
  }

  @Patch('/update')
  updateTodo(
    @Query('id') id: string,
    @Req() req,
    @Body() data: Partial<TodoDTO>,
  ) {
    const userId = req.user.id;
    return this.todoService.updateTodo(userId, id, data);
  }

  @Delete('/delete')
  deleteTodo(@Req() req, @Query('id') id: string) {
    const userId = req.user.id;
    return this.todoService.deleteTodo(userId, id);
  }
}
