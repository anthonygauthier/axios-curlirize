import expect from 'expect';
import axios from 'axios';
import curlirize from '../curlirize';
import { CurlHelper } from '../lib/CurlHelper';
import logger from 'fancy-log';

import { app } from './devapp';
import { BodyHelper } from '../../dist/lib/BodyHelper';

curlirize(axios);

describe('Testing curlirize', () => {
  it("should return a 200 with the value 'world'", (done) => {
    axios
      .post('http://localhost:7500/', { dummy: 'data' })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.hello).toBe('world');
        done();
      })
      .catch((err) => {
        logger.error(err);
      });
  });

  it('should return a generated command with XML as data', (done) => {
    axios
      .post('http://localhost:7500', '<myTestTag></myTestTag>')
      .then((res) => {
        expect(res.config.curlObject.getBody()).toBe("--data '<myTestTag></myTestTag>'");
        expect(res.config.curlCommand).toContain('<myTestTag></myTestTag>');
        done();
      })
      .catch((err) => {
        logger.error(err);
      });
  });

  it('should return the response with the defined curl command', (done) => {
    axios
      .post('http://localhost:7500/', { dummy: 'data' })
      .then((res) => {
        expect(res.config.curlCommand).toBeDefined();
        expect(res.config.curlCommand).toBe(
          'curl -X POST -H "Content-Type:application/x-www-form-urlencoded" --data \'{"dummy":"data"}\' http://localhost:7500/',
        );
        done();
      })
      .catch((err) => {
        logger.error(err);
      });
  });

  it('should return the generated command with no --data attribute', (done) => {
    axios
      .post('http://localhost:7500/')
      .then((res) => {
        expect(res.config.curlCommand).toBeDefined();
        expect(res.config.curlCommand).toBe(
          'curl -X POST -H "Content-Type:application/x-www-form-urlencoded" http://localhost:7500/',
        );
        done();
      })
      .catch((err) => {
        logger.error(err);
      });
  });

  it('should return the generated command with headers specified on method call', (done) => {
    axios
      .post('http://localhost:7500/', {}, { headers: { Authorization: 'Bearer 123', testHeader: 'Testing' } })
      .then((res) => {
        expect(res.config.curlCommand).toBeDefined();
        expect(res.config.curlCommand).toBe(
          'curl -X POST -H "Content-Type:application/x-www-form-urlencoded" -H "Authorization:Bearer 123" -H "testHeader:Testing" http://localhost:7500/',
        );
        done();
      })
      .catch((err) => {
        logger.error(err);
      });
  });
});

describe('Testing curl-helper module', () => {
  const fakeConfig = {
    adapter: () => {
      return 'dummy';
    },
    transformRequest: {
      '0': () => {
        return 'dummy';
      },
    },
    transformResponse: {
      '0': () => {
        return 'dummy';
      },
    },
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    validateStatus: () => {
      return 'dummy';
    },
    headers: { Accept: 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8' },
    method: 'post',
    url: 'http://localhost:7500/',
    data: { dummy: 'data' },
  };
  const curl = new CurlHelper(fakeConfig);

  it('should return an empty string if data is undefined', (done) => {
    let emptyConfig = {
      adapter: () => {
        return 'dummy';
      },
      transformRequest: {
        '0': () => {
          return 'dummy';
        },
      },
      transformResponse: {
        '0': () => {
          return 'dummy';
        },
      },
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      validateStatus: () => {
        return 'dummy';
      },
      headers: { Accept: 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8' },
      method: 'post',
      url: 'http://localhost:7500/',
      data: undefined,
    };
    const emptyDataCurl = new CurlHelper(emptyConfig);
    expect(emptyDataCurl.getBody()).toBe('');
    done();
  });

  it('should return an empty string if data is == empty string', (done) => {
    let emptyConfig = {
      adapter: () => {
        return 'dummy';
      },
      transformRequest: {
        '0': () => {
          return 'dummy';
        },
      },
      transformResponse: {
        '0': () => {
          return 'dummy';
        },
      },
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      validateStatus: () => {
        return 'dummy';
      },
      headers: { Accept: 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8' },
      method: 'post',
      url: 'http://localhost:7500/',
      data: '',
    };
    const emptyDataCurl = new CurlHelper(emptyConfig);
    expect(emptyDataCurl.getBody()).toBe('');
    done();
  });

  it('should return an empty string if data is == {}', (done) => {
    let emptyConfig = {
      adapter: () => {
        return 'dummy';
      },
      transformRequest: {
        '0': () => {
          return 'dummy';
        },
      },
      transformResponse: {
        '0': () => {
          return 'dummy';
        },
      },
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      validateStatus: () => {
        return 'dummy';
      },
      headers: { Accept: 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8' },
      method: 'post',
      url: 'http://localhost:7500/',
      data: {},
    };
    const emptyDataCurl = new CurlHelper(emptyConfig);
    expect(emptyDataCurl.getBody()).toBe('');
    done();
  });

  it('should return a string with headers', (done) => {
    expect(curl.getHeaders()).toBe(
      '-H "Accept:application/json, text/plain, */*" -H "Content-Type:application/json;charset=utf-8"',
    );
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
    expect(curl.getUrl()).toBe('http://localhost:7500/');
    done();
  });
});

describe('Testing body-helper module', () => {
  it("should return URIencoded body when content-type 'application/x-www-form-urlencoded'", (done) => {
    // TBD
    done();
  });
  it("should return XML Text body when content-type 'application/x-www-form-urlencoded'", (done) => {
    // TBD
    done();
  });
  it("should return XML Text body when content-type 'application/xml'", (done) => {
    // TBD
    done();
  });
  it("should return right body when content-type 'application/json'", (done) => {
    // TBD
    done();
  });
});
