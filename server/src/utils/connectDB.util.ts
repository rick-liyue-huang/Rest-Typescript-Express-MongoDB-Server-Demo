import mongoose from 'mongoose';
import chalk from 'chalk';
import config from 'config';

export const connectDBUtil = async () => {
  const mongoDBUri = config.get<string>('mongoDBUri');

  try {
    await mongoose.connect(mongoDBUri);
    console.log(chalk.bgBlueBright.bold('connected to mongoDB already'));
  } catch (err) {
    console.error(chalk.bgRedBright('Not yet connect with mongoDB'));
    process.exit(1);
  }

  /*
  return mongoose
    .connect(mongoDBUri)
    .then(() => {
      console.log('connected to mongoDB already');
    })
    .catch((err) => {
      console.error('Not yet connect with mongoDB');
      process.exit(1);
    });
  */
};
