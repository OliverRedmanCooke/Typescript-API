import { DB_HOST, DB_PORT, DB_DATABASE, DB_CONNECTION } from '@config';

let connection = '';

if (DB_CONNECTION) {
  connection = DB_CONNECTION;
} else {
  connection = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
}

export const dbConnection = {
  url: connection,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
