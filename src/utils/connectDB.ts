import mongoose from 'mongoose';
import config from 'config';
import logger from '../utils/logger';

/**
 * @define using mongoose to connect with MongoDB
 */
async function connectDB() {
  const mongoDBURI = config.get<string>('mongoDBUri');
  logger.info('MongoDB is connected');
  try {
    await mongoose.connect(mongoDBURI);
  } catch (err) {
    logger.error('Not yet connect with DB');
    process.exit(1);
  }

  /* second method
    return mongoose.connect(mongoDBURI)
      .then(() => {
        console.log('Connected to DB');
      })
      .catch(err => {
        console.error('Not yet connect with DB');
        process.exit(1)
      })
  */
}

export default connectDB;
