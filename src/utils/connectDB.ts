import { log } from 'console-log-colors';
import mongoose from 'mongoose';
import config from 'config';
import dayjs from 'dayjs';

export const connectDB = async () => {
  const dbURI = config.get<string>('mongoDBUri');
  try {
    await mongoose.connect(dbURI);
    log.bgYellowBright(
      `This server connected with MongoDB already, time: ${dayjs().format()}`
    );
  } catch (err) {
    log.bgRedBright(`Not yet connect with MongoDB, time: ${dayjs().format()}`);
    process.exit(1);
  }

  /*
  return mongoose
    .connect(dbURI)
    .then(() => {
      log.bgYellowBright('This server connected with MongoDB already');
    })
    .catch((err) => {
      log.redBright('Not yet connect with MongoDB');
      process.exit(1); // means error
    });
    */
};
