import { Router } from 'express';
import TaskController from '@controllers/task.controller';
import { CreateTaskDto } from '@dtos/task.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class TasksRoute implements Routes {
  public path = '/tasks';
  public router = Router();
  public TaskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.TaskController.getTasks);
    this.router.get(`${this.path}/:id`, this.TaskController.getTaskById);
    this.router.post(`${this.path}`, validationMiddleware(CreateTaskDto, 'body'), this.TaskController.createTask);
    this.router.delete(`${this.path}/:id`, this.TaskController.deleteTask);
  }
}

export default TasksRoute;
