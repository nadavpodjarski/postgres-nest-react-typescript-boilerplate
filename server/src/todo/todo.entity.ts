import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  content: string;

  @CreateDateColumn()
  createdOn: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  completed: boolean;

  @ManyToOne(
    type => UserEntity,
    author => author.todos,
  )
  author: UserEntity;
}
