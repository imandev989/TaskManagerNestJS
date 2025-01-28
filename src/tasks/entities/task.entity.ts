import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import TaskStatusEnum from '../enums/taskStatusEnum';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.Set,
  })
  status: TaskStatusEnum;
}
