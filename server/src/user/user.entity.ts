import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { TodoEntity } from 'src/todo/todo.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  createdOn: Date;

  @BeforeInsert()
  hashPassword = async () => {
    this.password = await hash(this.password, 8);
  };

  // @OneToMany(
  //   type => TodoEntity,
  //   todo => todo.author,
  // )
  // todos: TodoEntity[];

  comparePassword = async (attempt: string) => {
    return await compare(attempt, this.password);
  };

  sanitizeObject = (): UserSO => {
    const { id, createdOn, email, token } = this;
    return { id, createdOn, email, token };
  };

  private get token() {
    const { id, email } = this;
    return sign(
      {
        id,
        email,
      },
      process.env.SECRET,
      { expiresIn: '3d' },
    );
  }
}

export type UserSO = {
  id: string;
  createdOn: Date;
  email: string;
  token: string;
};
