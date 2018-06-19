import expect from 'expect';
import request from 'supertest';
import axios from 'axios';
import curlirize from '../curlirize';
import curlHelper from '../lib/curl-helper';
import logger from 'fancy-log';

import {app} from './devapp';

curlirize(axios);

describe('Testing axios-middleware module', () => {
    it('should return a 200 with the value \'world\'', (done) => {
        axios.get('http://localhost:7500/')
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.data.hello).toBe('world');
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
        headers: { Accept: 'application/json, text/plain, */*' },
        method: 'get',
        url: 'http://localhost:7500/',
        data: undefined 
    }

    it('should return a string with headers', (done) => {
        
        done();
    });

    it('should return a string with HTTP method', (done) => {
        
        done();
    });

    it('should return a string with request body', (done) => {
        
        done();
    });

    it('should return the URL of the request', (done) => {
        
        done();
    });
});