import express from 'express';
import config from 'config';
import chalk from 'chalk';
import dayjs from 'dayjs';
import { connectDBUtil } from './utils/connectDB.util';
import { routes } from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { deserializeUser } from './middlewares/deserializeUser';

const app = express();
const PORT = config.get<number>('port');

app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(deserializeUser);

app.listen(PORT, async () => {
  console.log(
    chalk.underline.bgYellowBright.bold(
      `This server is running on port of ${PORT}, time: ${dayjs().format()}`
    )
  );
  await connectDBUtil();
  routes(app);
});
