import ProjectStatusEnum from '../enums/projectStatusEnum';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @IsEnum(ProjectStatusEnum, {
    message: 'status must be one of the following: active, inactive, completed',
  })
  status: ProjectStatusEnum;
}
