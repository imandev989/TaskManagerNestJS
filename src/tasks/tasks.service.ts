import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import TaskStatusEnum from './enums/taskStatusEnum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    const { projectId, ...taskData } = createTaskDto;
    const project = await this.projectRepository.findOneByOrFail({ id: projectId })
    try {
      const newTask = this.taskRepository.create({
        ...taskData,
        project
      });
      return await this.taskRepository.save(newTask)
    } catch (error) {
      throw new BadRequestException("Erro when Task Created")
    }
  }

  async findAll(status?: TaskStatusEnum, limit: number = 10, page: number = 1) {

    const query = this.taskRepository.createQueryBuilder('tasks').leftJoinAndSelect('tasks.project', 'project');
    if (status) {
      query.where('tasks.status= : status', { status })
    }
    query.skip((page - 1) * limit).take(limit)
    return await query.getMany();

  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
