import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateTaskDto } from '@dtos/task.dto';
import TasksRoute from '@routes/tasks.route';
import { Task } from '@interfaces/task.interface';

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
          description: 'Task 1 description',
        },
        {
          _id: '64455106ebbe6eac1cf3d056',
          title: 'Task 2',
          priority: 'HIGH',
          description: 'Task 2 description',
        },
        {
          _id: '644560d8ebbe6eac1cf3d09d',
          title: 'Task 3',
          priority: 'HIGH',
          description: 'Task 3 description',
        },
      ];

      tasks.find = jest.fn().mockReturnValue(tasksData);

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);
      // Check response and returned tasks
      const response = await request(app.getServer()).get(`${tasksRoute.path}`).expect(200);

      const returnedTasks: Task[] = response.body.data;

      for (const task of tasksData) {
        const foundTask = returnedTasks.find(rTask => rTask._id === task._id);
        expect(foundTask);
      }
    });
  });

  describe('[GET] /tasks/:id', () => {
    it('response findOne Task', async () => {
      const taskId = '642c3b1ed0ce1fad114811d4';

      const tasksRoute = new TasksRoute();
      const tasks = tasksRoute.TaskController.taskService.tasks;

      tasks.findOne = jest.fn().mockReturnValue({
        _id: taskId,
        title: 'Task 1',
        priority: 'HIGH',
        description: 'Task 1 description',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);
      // Check response and returned task
      const response = await request(app.getServer()).get(`${tasksRoute.path}/${taskId}`).expect(200);

      const returnedTask: Task = response.body.data;

      expect(returnedTask._id === taskId);
    });
  });

  describe('[POST] /tasks', () => {
    it('response Create Task', async () => {
      const taskData: CreateTaskDto = {
        title: 'Task 1',
        priority: 'HIGH',
        description: 'Task 1 description',
      };

      const tasksRoute = new TasksRoute();
      const tasks = tasksRoute.TaskController.taskService.tasks;

      tasks.findOne = jest.fn().mockReturnValue(null);
      tasks.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        ...taskData,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);
      // Check response and returned task
      const response = await request(app.getServer()).post(`${tasksRoute.path}`).send(taskData).expect(201);

      const returnedTask: Task = response.body.data;

      expect(returnedTask.title === taskData.title);
      expect(returnedTask.priority === taskData.priority);
      expect(returnedTask.description === taskData.description);
    });
  });

  describe('[DELETE] /tasks/:id', () => {
    it('response Delete Task', async () => {
      const taskId = '642c3b1ed0ce1fad114811d4';
      const taskData: CreateTaskDto = {
        title: 'Task 1',
        priority: 'HIGH',
        description: 'Task 1 description',
      };
      const tasksRoute = new TasksRoute();
      const tasks = tasksRoute.TaskController.taskService.tasks;

      tasks.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: taskId,
        ...taskData,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);

      // Check response, message and returned task
      const response = await request(app.getServer()).delete(`${tasksRoute.path}/${taskId}`).expect(200);

      const returnedData = response.body;

      expect(returnedData.message === 'deleted');
      expect(returnedData.data._id === taskId);
    });
  });
});
