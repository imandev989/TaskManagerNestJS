import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';

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
  async findAll(@Res() res: Response) {
    const tasks = await this.tasksService.findAll();

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
