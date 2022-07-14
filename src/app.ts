/**
 *@description create the express server, and use the config/default variables,
 * because this project import config dependency
 */
import express from 'express';
import config from 'config';
import connectDB from './utils/connectDB';
import logger from './utils/logger';
import routes from './routes';

// import dotenv from 'dotenv';
// dotenv.config();

const app = express();
// const PORT = process.env.PORT || 1336;
const PORT = config.get<number>('port');

app.use(express.json());

app.listen(PORT, async () => {
  logger.info(`this express server is running on port of ${PORT}`);
  await connectDB();

  // wrap the app.use in routes file
  routes(app);
});
