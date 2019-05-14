import { CurlHelper } from './lib/CurlHelper';

// thanks to https://github.com/uyu423
function defaultLogCallback(curlResult, err) {
  const { command } = curlResult;
  if (err) {
    console.error(err);
  } else {
    console.info(command);
  }
}

export default (instance, callback = defaultLogCallback) => {
  instance.interceptors.request.use((req) => {
    try {
      const curl = new CurlHelper(req);
      req.curlObject = curl;
      req.curlCommand = curl.generateCommand();
    } catch (err) {
      // Even if the axios middleware is stopped, no error should occur outside.
      callback(null, err);
    } finally {
      callback({
        command: req.curlCommand,
        object: req.curlObject,
      });
      return req;
    }
  });
};

