import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import TasksRouter from '@routes/tasks.route';

validateEnv();

const app = new App([new IndexRoute(), new TasksRouter()]);

app.listen();
