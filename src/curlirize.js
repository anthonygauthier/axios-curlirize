import { CurlHelper } from './lib/CurlHelper';
import logger from 'fancy-log';

function defaultLogFunc(curlCommand) {
  logger.info(curlCommand);
}

export default (instance, logFunc = defaultLogFunc) => {
  instance.interceptors.request.use((req) => {
    const curl = new CurlHelper(req);
    req.curlObject = curl;
    req.curlCommand = curl.generateCommand();
    logFunc(req.curlCommand);
    return req;
  });
};
