import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateTaskDto } from '@dtos/task.dto';
import TasksRoute from '@routes/tasks.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Tasks', () => {
  describe('[GET] /tasks', () => {
    it('response findAll Tasks', async () => {
      const tasksRoute = new TasksRoute();
      const tasks = tasksRoute.TaskController.taskService.tasks;

      const tasksData = [
        {
          _id: '642c3b1ed0ce1fad114811d4',
          title: 'Task 1',
          priority: 'HIGH',
          description: 'Task 1 description'
        },
        {
          _id: '64455106ebbe6eac1cf3d056',
          title: 'Task 2',
          priority: 'HIGH',
          description: 'Task 2 description'
        },
        {
          _id: '644560d8ebbe6eac1cf3d09d',
          title: 'Task 3',
          priority: 'HIGH',
          description: 'Task 3 description'
        },
      ]

      tasks.find = jest.fn().mockReturnValue(tasksData);

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);
      return request(app.getServer()).get(`${tasksRoute.path}`).expect(200);
    });
  });

  describe('[GET] /tasks/:id', () => {
    it('response findOne Task', async () => {
      const taskId = '642c3b1ed0ce1fad114811d4';

      const tasksRoute = new TasksRoute();
      const tasks = tasksRoute.TaskController.taskService.tasks;

      tasks.findOne = jest.fn().mockReturnValue({
        _id: '642c3b1ed0ce1fad114811d4',
        title: 'Task 1',
        priority: 'HIGH',
        description: 'Task 1 description'
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);
      return request(app.getServer()).get(`${tasksRoute.path}/${taskId}`).expect(200);
    });
  });

  describe('[POST] /tasks', () => {
    it('response Create Task', async () => {
      const taskData: CreateTaskDto = {
        title: 'Task 1',
        priority: 'HIGH',
        description: 'Task 1 description'
      }

      const tasksRoute = new TasksRoute();
      const tasks = tasksRoute.TaskController.taskService.tasks;

      tasks.findOne = jest.fn().mockReturnValue(null);
      tasks.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        ...taskData
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);
      return request(app.getServer()).post(`${tasksRoute.path}`).send(taskData).expect(201);
    });
  });

  describe('[DELETE] /tasks/:id', () => {
    it('response Delete Task', async () => {
      const taskId = '642c3b1ed0ce1fad114811d4';
      const taskData: CreateTaskDto = {
        title: 'Task 1',
        priority: 'HIGH',
        description: 'Task 1 description'
      }
      const tasksRoute = new TasksRoute();
      const tasks = tasksRoute.TaskController.taskService.tasks;

      tasks.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '642c3b1ed0ce1fad114811d4',
        ...taskData
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);
      return request(app.getServer()).delete(`${tasksRoute.path}/${taskId}`).expect(200);
    });
  });
});
