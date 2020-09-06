import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { TodoDTO, TodoSO } from './todo.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private responseOject = (todo: TodoEntity): TodoSO => {
    return {
      ...todo,
      author: todo.author.sanitizeObject(),
    };
  };

  private verifyOwnership = (todo: TodoEntity, userId: string) => {
    if (todo.author.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  };

  getAllTodos = async (userId: string): Promise<TodoSO[]> => {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const todos = await this.todoRepository.find({
      where: { author: user },
      order: { createdOn: 'DESC' },
      relations: ['author'],
    });
    return todos.map(todo => {
      this.verifyOwnership(todo, userId);
      return this.responseOject(todo);
    });
  };

  createTodo = async (
    userId: string,
    content: Extract<TodoDTO, 'content'>,
  ): Promise<TodoSO> => {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const newTodo = this.todoRepository.create({
      content,
      author: user,
    });
    await this.todoRepository.save(newTodo);

    return this.responseOject(newTodo);
  };

  updateTodo = async (
    userId: string,
    id: string,
    data: Partial<TodoDTO>,
  ): Promise<TodoSO> => {
    const todo = await this.todoRepository.findOne(
      { id },
      { relations: ['author'] },
    );

    if (!todo) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    this.verifyOwnership(todo, userId);

    if (data.hasOwnProperty('completed')) {
      await this.todoRepository.update({ id }, { completed: data.completed });
    }
    if (data.content) {
      await this.todoRepository.update({ id }, { content: data.content });
    }

    return this.responseOject(todo);
  };

  deleteTodo = async (userId: string, id: string): Promise<TodoSO> => {
    const todo = await this.todoRepository.findOne(
      { id },
      { relations: ['author'] },
    );

    if (!todo) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    this.verifyOwnership(todo, userId);

    await this.todoRepository.remove(todo);

    return this.responseOject(todo);
  };
}
