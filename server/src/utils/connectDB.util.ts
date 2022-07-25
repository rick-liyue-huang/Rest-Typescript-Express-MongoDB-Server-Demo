import mongoose from 'mongoose';
import config from 'config';
import colors from 'colors';

/**
 * @define create the connection to mongoDB
 */
export const connectDBUtil = async () => {
  try {
    await mongoose.connect(config.get<string>('mongoDBUri'));
    console.log(
      colors.bgCyan.underline.bold.yellow(
        'This server is already connected with MongoDB'
      )
    );
  } catch (err: any) {
    console.error(
      colors.bgRed.underline.bold.yellow(
        'This server not yet connected with DB'
      )
    );
  }
};
