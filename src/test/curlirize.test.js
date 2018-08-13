import expect from 'expect';
import axios from 'axios';
import curlirize from '../curlirize';
import { CurlHelper } from '../lib/CurlHelper';
import logger from 'fancy-log';

import {app} from './devapp';

curlirize(axios);

describe('Testing curlirize', () => {
    it('should return a 200 with the value \'world\'', (done) => {
        axios.post('http://localhost:7500/', {dummy: 'data'})
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.data.hello).toBe('world');
            done();
        })
        .catch((err) => {
            logger.error(err);
        });
    });

    it('should return the response with the defined curl command', (done) => {
        axios.post('http://localhost:7500/', {dummy: 'data'})
        .then((res) => {
            expect(res.config.curlCommand).toBeDefined();
            expect(res.config.curlCommand).toBe('curl -X POST -H "Content-Type:application/x-www-form-urlencoded" --data \'{"dummy":"data"}\' http://localhost:7500/');
            done();
        })
        .catch((err) => {
            logger.error(err);
        });
    });
});

describe('Testing curl-helper module', () => {
    const fakeConfig = { 
        adapter: () => {return 'dummy'},
        transformRequest: { '0': () => {return 'dummy'}},
        transformResponse: { '0': () => {return 'dummy'}},
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        validateStatus: () => {return 'dummy'},
        headers: { Accept: 'application/json, text/plain, */*', 'Content-Type':'application/json;charset=utf-8'},
        method: 'post',
        url: 'http://localhost:7500/',
        data: {dummy:'data'} 
    }
    const curl = new CurlHelper(fakeConfig);

    it('should return a string with headers', (done) => {
        expect(curl.getHeaders()).toBe('-H "Accept:application/json, text/plain, */*" -H "Content-Type:application/json;charset=utf-8"');
        done();
    });

    it('should return a string with HTTP method', (done) => {
        expect(curl.getMethod()).toBe('-X POST');
        done();
    });

    it('should return a string with request body', (done) => {
        expect(curl.getBody()).toBe('--data \'{"dummy":"data"}\'');
        done();
    });

    it('should return the URL of the request', (done) => {
        expect(curl.getUrl()).toBe("http://localhost:7500/");
        done();
    });
});