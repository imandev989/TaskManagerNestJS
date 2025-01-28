import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import ProjectStatusEnum from '../enums/projectStatusEnum';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({
    type: 'enum',
    enum: ProjectStatusEnum,
    default: ProjectStatusEnum.Enable,
  })
  status: ProjectStatusEnum;
}
