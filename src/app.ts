import { log } from 'console-log-colors';
import express from 'express';
import config from 'config';
import { connectDB } from './utils/connectDB.utils';
import dayjs from 'dayjs';
import { routes } from './routes';

const app = express();
// using the port from config
const PORT = config.get<number>('port') || 1336;

app.use(express.json());

app.listen(PORT, async () => {
  log.bgCyanBright(
    `This express server is running on port of ${PORT}, time: ${dayjs().format()}`
  );

  // try to connect with DB
  await connectDB();

  //  using the routes rules
  routes(app);
});
