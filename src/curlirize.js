import { HttpMiddlewareService } from 'axios-middleware';
import curlHelper from './lib/curl-helper';

export default (instance) => {
    const service = new HttpMiddlewareService(instance);

    service.register({
        onRequest(config) {
            curlHelper.transformRequest(config);
            return config;
        }
    })
}