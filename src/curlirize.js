import { HttpMiddlewareService } from 'axios-middleware';
import { CurlHelper } from './lib/CurlHelper';
import logger from 'fancy-log';

export default (instance) => {
    const service = new HttpMiddlewareService(instance);

    service.register({
        onRequest(config) {
            //log curl command
            let curl = new CurlHelper(config);
            logger.info(curl.generateCommand());

            //handle axios request as usual
            return config;
        }
    })
}