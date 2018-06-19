import { HttpMiddlewareService } from 'axios-middleware';
import curlHelper from './lib/curl-helper';

module.exports.curlirize = (instance) => {
    const service = new HttpMiddlewareService(instance);

    service.register({
        onRequest(config) {
            console.log(curlHelper.transformRequest(config));
        }
    })
}