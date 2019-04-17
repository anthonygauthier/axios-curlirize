import { CurlHelper } from './lib/CurlHelper';
import logger from 'fancy-log';

function defaultLogFunc(curlCommand, err) {
  if (curlCommand) {
    logger.info(curlCommand);
  }
  if (err) {
    logger.error(err);
  }
}

export default (instance, logFunc = defaultLogFunc) => {
  instance.interceptors.request.use((req) => {
    try {
      const curl = new CurlHelper(req);
      req.curlObject = curl;
      req.curlCommand = curl.generateCommand();
    } catch (err) {
      // Even if the axios middleware is stopped, no error should occur outside.
      logFunc(null, err);
    } finally {
      logFunc(req.curlCommand);
      return req;
    }
  });
};
