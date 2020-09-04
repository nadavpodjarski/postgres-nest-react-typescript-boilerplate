import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodosEntity } from './todo.entity';
import { TodoDTO } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodosEntity)
    private todoRepository: Repository<TodosEntity>,
  ) {}

  getAllTodos = async () => {
    return await this.todoRepository.find({ order: { createdOn: 'DESC' } });
  };

  createTodo = async (content: Extract<TodoDTO, 'content'>) => {
    const newTodo = this.todoRepository.create({ content });
    await this.todoRepository.save(newTodo);
    return newTodo;
  };

  updateTodo = async (id: string, data: Partial<TodoDTO>) => {
    if (data.hasOwnProperty('completed')) {
      await this.todoRepository.update({ id }, { completed: data.completed });
    }
    if (data.content) {
      await this.todoRepository.update({ id }, { content: data.content });
    }
  };

  deleteTodo = async (id: string) => {
    await this.todoRepository.delete({ id });
    return { deleted: true };
  };
}
