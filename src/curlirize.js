import { HttpMiddlewareService } from 'axios-middleware';
import { CurlHelper } from './lib/CurlHelper';

export default (instance) => {
    const service = new HttpMiddlewareService(instance);

    service.register({
        onRequest(config) {
            let curl = new CurlHelper(config);
            console.log(curl.generateCommand());
            return config;
        }
    })
}