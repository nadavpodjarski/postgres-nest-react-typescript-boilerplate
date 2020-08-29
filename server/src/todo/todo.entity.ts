import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
} from 'typeorm';

@Entity('todos')
export class TodosEntity {
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
}
