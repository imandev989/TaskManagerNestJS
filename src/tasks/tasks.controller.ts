import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import TaskStatusEnum from './enums/taskStatusEnum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    const newTask = await this.tasksService.create(createTaskDto);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: newTask,
      message: "Task Created"
    })
  }

  @Get()
  async findAll(
    @Res() res: Response
    @Query('status') status?: TaskStatusEnum,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1

  ) {
    const tasks = await this.tasksService.findAll(status, limit, page);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: tasks,
      message: "Task Created Successfully"
    })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
