import express from 'express';
import config from 'config';
import colors from 'colors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDBUtil } from './utils/connectDB.util';
import { routes } from './routes';
import { deserializeUser } from './middlewares/deserializeUser';

const PORT = config.get<string>('port') || 1336;

// create server by express
const app = express();
app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true
  })
);
// for cookie set tokens
app.use(cookieParser());
app.use(express.json());
app.use(deserializeUser);

// app is started
app.listen(PORT, async () => {
  console.log(colors.rainbow(`This server is listening on port of ${PORT}`));
  await connectDBUtil();

  routes(app);
});
