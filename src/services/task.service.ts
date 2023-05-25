import { CreateTaskDto } from '@dtos/task.dto';
import { HttpException } from '@exceptions/HttpException';
import { Task } from '@interfaces/task.interface';
import taskModel from '@models/task.model';
import { isEmpty } from '@utils/util';

class TaskService {
  public tasks = taskModel;

  public async findAllTask(): Promise<Task[]> {
    const tasks: Task[] = await this.tasks.find();
    return tasks;
  }

  public async findTaskById(taskId: string): Promise<Task> {
    if (isEmpty(taskId)) throw new HttpException(400, 'taskId is empty');

    const findTask: Task = await this.tasks.findById(taskId);
    if (!findTask) throw new HttpException(409, "Task doesn't exist");

    return findTask;
  }

  public async createTask(taskData: CreateTaskDto): Promise<Task> {
    if (isEmpty(taskData)) throw new HttpException(400, 'TaskData is empty');

    const createTaskData: Task = await this.tasks.create({ ...taskData });

    return createTaskData;
  }

  public async deleteTask(taskId: string): Promise<Task> {
    const deleteTaskById: Task = await this.tasks.findByIdAndDelete(taskId);
    if (!deleteTaskById) throw new HttpException(409, "Task doesn't exist");

    return deleteTaskById;
  }
}

export default TaskService;
