import pino from 'pino';
import pretty from 'pino-pretty';
const stream = pretty({
  colorize: true
});
import dayjs from 'dayjs';

/**
 * @define create logger tools to export the comprehensive console
 */
const logger = pino(
  {
    timestamp: () => `,"time": ${dayjs().format()}`
  },
  stream
);

//
// const log = logger({
//   transport: {
//     target: 'pino-pretty',
//     options: {
//       colorize: true
//     }
//   },
//   base: {
//     pid: false
//   },
//   level: 'info',
//   timestamp: () => `,"time": ${dayjs().format()}`
// });
//
export default logger;
