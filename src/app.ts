import { log } from 'console-log-colors';
import express from 'express';
import config from 'config';
import { connectDB } from './utils/connectDB';
import dayjs from 'dayjs';

const app = express();
// using the port from config
const PORT = config.get<number>('port') || 1336;

app.listen(PORT, async () => {
  log.bgCyanBright(
    `This express server is running on port of ${PORT}, time: ${dayjs().format()}`
  );

  await connectDB();
});
