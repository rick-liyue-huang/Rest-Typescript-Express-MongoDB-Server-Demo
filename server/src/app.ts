import { log } from 'console-log-colors';
import express from 'express';
import config from 'config';
import cors from 'cors';
import { connectDB } from './utils/connectDB.util';
import dayjs from 'dayjs';
import { routes } from './routes';
import { deserializeUser } from './middlewares/deserializeUser';
import { createServer } from 'net';
// using the port from config
const PORT = config.get<number>('port') || 1336;

// export the app for supertest lib in __tests__ directory
export const app = express(); // for test

app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true
  })
);

app.use(express.json()); // for test
// let all the routes can get the user info after login
app.use(deserializeUser); // for test

// const app = createServer(); // for test

app.listen(PORT, async () => {
  log.bgCyanBright(
    `This express server is running on port of ${PORT}, time: ${dayjs().format()}`
  );

  // try to connect with DB
  await connectDB();

  //  using the routes rules
  routes(app); // for test
});
