import expect from 'expect';
import request from 'supertest';
import axios from 'axios';
import curlirize from '../curlirize';
import logger from 'fancy-log';

import {app} from './devapp';

describe('Tests concerning the curl-helper', () => {
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

    it('should add the headers to the curl string', () => {

    });
});