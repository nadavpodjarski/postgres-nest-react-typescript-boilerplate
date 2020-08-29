import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodosEntity } from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodosEntity])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
