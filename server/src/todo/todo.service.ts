import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { TodoDTO } from './todo.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  getAllTodos = async () => {
    return await this.todoRepository.find({
      order: { createdOn: 'DESC' },
    });
  };

  createTodo = async (content: Extract<TodoDTO, 'content'>) => {
    const newTodo = this.todoRepository.create({ content });
    await this.todoRepository.save(newTodo);
    return newTodo;
  };

  updateTodo = async (id: string, data: Partial<TodoDTO>) => {
    const todo = await this.todoRepository.findOne({ id });
    if (!todo) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);

    if (data.hasOwnProperty('completed')) {
      await this.todoRepository.update({ id }, { completed: data.completed });
    }
    if (data.content) {
      await this.todoRepository.update({ id }, { content: data.content });
    }

    return todo;
  };

  deleteTodo = async (id: string) => {
    const todo = await this.todoRepository.findOne({ id });
    if (!todo) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);

    await this.todoRepository.delete({ id });
    return todo;
  };
}
