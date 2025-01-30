import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
import TaskStatusEnum from '../enums/taskStatusEnum';

export class CreateTaskDto {
  @IsString({ message: 'title must be String' })
  @MinLength(3, { message: 'title must be at least 3 characters' })
  @IsNotEmpty({ message: 'title must be not empty' })
  title: string;

  @IsString({ message: 'description must be String' })
  @MinLength(10, { message: 'description must be at least 10 characters' })
  @IsOptional()
  description: string;

  @IsEnum(TaskStatusEnum, {
    message: 'status must be one of the following: open, in progress, done',
  })
  @IsOptional()
  status: TaskStatusEnum;
  @IsNotEmpty({message:"you must insert project"})
  projectId: number;
}
