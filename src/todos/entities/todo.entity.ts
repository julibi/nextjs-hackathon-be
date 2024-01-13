import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'OTHER' })
  category?: 'CHORE' | 'WORK' | 'OTHER';

  @Column({ default: false })
  isCompleted?: boolean;

  constructor(todo: Partial<Todo>) {
    Object.assign(this, todo);
  }
}
