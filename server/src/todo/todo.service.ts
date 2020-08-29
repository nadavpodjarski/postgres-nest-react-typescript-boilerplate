import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodosEntity } from './todo.entity';
import { ITodoDTO } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodosEntity)
    private todoRepository: Repository<TodosEntity>,
  ) {}

  async getAllTodos() {
    return await this.todoRepository.find({ order: { createdOn: 'DESC' } });
  }

  async createTodo(content: Extract<ITodoDTO, 'content'>) {
    const newTodo = this.todoRepository.create({ content });
    await this.todoRepository.save(newTodo);
    return newTodo;
  }

  async updateTodo(id: string, data: Partial<ITodoDTO>) {
    if (data.hasOwnProperty('completed')) {
      await this.todoRepository.update({ id }, { completed: data.completed });
    }
    if (data.content) {
      await this.todoRepository.update({ id }, { content: data.content });
    }
  }

  async deleteTodo(id: string) {
    await this.todoRepository.delete({ id });
    return { deleted: true };
  }
}
