import expect from "expect";
import axios from "axios";
import curlirize from "../src/main.js";
import { CurlHelper } from "../src/lib/CurlHelper.js";
import qs from 'qs'
import app from "./devapp.js";

curlirize(axios);

describe("Testing curlirize", () => {
  it("should return a 200 with the value 'world'", (done) => {
    axios.post("http://localhost:7500/", { dummy: "data" })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.data.hello).toBe("world");
          done();
        })
        .catch((err) => {
          console.error(err);
        });
  });
  it("should allow to remove curlirize part on a request", (done) => {
    axios.post("http://localhost:7500/", { dummy: "data" })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.data.hello).toBe("world");
          res.config.clearCurl();
          expect(res.config.curlObject).not.toBeDefined();
          expect(res.config.curlCommand).not.toBeDefined();
          expect(res.config.clearCurl).not.toBeDefined();
          done();
        })
        .catch((err) => {
          console.error(err);
        });
  });

  it("should return a generated command with XML as data", (done) => {
    axios.post("http://localhost:7500", "<myTestTag></myTestTag>")
      .then((res) => {
        expect(res.config.curlObject.getBody()).toBe("--data '<myTestTag></myTestTag>'");
        expect(res.config.curlCommand).toContain("<myTestTag></myTestTag>");
        done();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  it("should return the response with the defined curl command", (done) => {
    axios.post("http://localhost:7500/", { dummy: "data" })
      .then((res) => {
        expect(res.config.curlCommand).toBeDefined();
        expect(res.config.curlCommand).toBe(`curl -X POST "http://localhost:7500/" -H "Content-Type:application/x-www-form-urlencoded" --data '{"dummy":"data"}'`);
        done();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  it("should return the generated command with no --data attribute", (done) => {
    axios.post("http://localhost:7500/")
      .then((res) => {
        expect(res.config.curlCommand).toBeDefined();
        expect(res.config.curlCommand).toBe(`curl -X POST "http://localhost:7500/" -H "Content-Type:application/x-www-form-urlencoded"`);
        done();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  it("should return the generated command with headers specified on method call", (done) => {
    axios.post("http://localhost:7500/", null, {headers: {Authorization: "Bearer 123", testHeader: "Testing"}})
      .then((res) => {
        expect(res.config.curlCommand).toBeDefined();
        expect(res.config.curlCommand).toBe('curl -X POST "http://localhost:7500/" -H "Content-Type:application/x-www-form-urlencoded" -H "Authorization:Bearer 123" -H "testHeader:Testing"');
        done();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  it("should return the generated command with a queryString specified in the URL", (done) => {
    axios.post("http://localhost:7500/", null, {params: {test: 1}})
      .then((res) => {
        expect(res.config.curlCommand).toBeDefined();
        expect(res.config.curlCommand).toBe('curl -X POST "http://localhost:7500/?test=1" -H "Content-Type:application/x-www-form-urlencoded"');
        done();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  it("should return the generated command with a queryString specified in the URL with paramsSerializer", (done) => {
    const api = axios.create({
      paramsSerializer: (params) => {
        return qs.stringify(params)
      }
    })
    curlirize(api)
    api.post("http://localhost:7500/", null, {params: {test: 1, text: 'sim'}})
      .then((res) => {
        expect(res.config.curlCommand).toBeDefined();
        expect(res.config.curlCommand).toBe('curl -X POST "http://localhost:7500/?test=1&text=sim" -H "Content-Type:application/x-www-form-urlencoded"');
        done();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  it("do not add ? if params is empty", (done) => {
    axios.post("http://localhost:7500/", null)
      .then((res) => {
        expect(res.config.curlCommand).toBeDefined();
        expect(res.config.curlCommand).toBe('curl -X POST "http://localhost:7500/" -H "Content-Type:application/x-www-form-urlencoded"');
        done();
      })
      .catch((err) => {
        console.log('--', err)
        console.error(err);
      });
  });

  it("do not cut end slash", (done) => {
    const api = axios.create({
      baseURL: 'http://localhost:7500',
    })
    curlirize(api)
    api.post("api/", null, {params: {test: 1, text: 'sim'}})
      .then((res) => {
        expect(res.config.curlCommand).toBeDefined();
        expect(res.config.curlCommand).toBe('curl -X POST "http://localhost:7500/api/?test=1&text=sim" -H "Content-Type:application/x-www-form-urlencoded"');
        done();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  it("cut middle slash", (done) => {
    const api = axios.create({
      baseURL: 'http://localhost:7500/',
    })
    curlirize(api)
    api.post("/api/", null, {params: {test: 1, text: 'sim'}})
      .then((res) => {
        expect(res.config.curlCommand).toBeDefined();
        expect(res.config.curlCommand).toBe('curl -X POST "http://localhost:7500/api/?test=1&text=sim" -H "Content-Type:application/x-www-form-urlencoded"');
        done();
      })
      .catch((err) => {
        console.error(err);
      });
  });
});

describe("Testing curl-helper module", () => {
  const fakeConfig = {
    adapter: () => { return "dummy"; },
    transformRequest: { "0": () => { return "dummy"; } },
    transformResponse: { "0": () => { return "dummy"; } },
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    validateStatus: () => { return "dummy"; },
    headers: { Accept: "application/json, text/plain, */*", "Content-Type": "application/json;charset=utf-8" },
    method: "post",
    url: "http://localhost:7500/",
    data: { dummy: "data" },
    params: { testParam: "test1", testParamTwo: "test2"}
  };
  const curl = new CurlHelper(fakeConfig);

  it("should return an empty string if data is undefined", (done) => {
    let emptyConfig = {
      adapter: () => { return "dummy" },
      transformRequest: { "0": () => { return "dummy" } },
      transformResponse: { "0": () => { return "dummy" } },
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      validateStatus: () => { return "dummy" },
      headers: { Accept: "application/json, text/plain, */*", "Content-Type": "application/json;charset=utf-8" },
      method: "post",
      url: "http://localhost:7500/",
      data: undefined
    };
    const emptyDataCurl = new CurlHelper(emptyConfig);
    expect(emptyDataCurl.getBody()).toBe("");
    done();
  });

  it("should return an empty string if data is == empty string", (done) => {
    let emptyConfig = {
      adapter: () => { return "dummy" },
      transformRequest: { "0": () => { return "dummy" } },
      transformResponse: { "0": () => { return "dummy" } },
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      validateStatus: () => { return "dummy" },
      headers: { Accept: "application/json, text/plain, */*", "Content-Type": "application/json;charset=utf-8" },
      method: "post",
      url: "http://localhost:7500/",
      data: ""
    };
    const emptyDataCurl = new CurlHelper(emptyConfig);
    expect(emptyDataCurl.getBody()).toBe('');
    done();
  });

  it("should return {} as --data if req data is == {}", (done) => {
    let emptyConfig = {
      adapter: () => { return "dummy" },
      transformRequest: { "0": () => { return "dummy" } },
      transformResponse: { "0": () => { return "dummy" } },
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      validateStatus: () => { return "dummy" },
      headers: { Accept: "application/json, text/plain, */*", "Content-Type": "application/json;charset=utf-8" },
      method: "post",
      url: "http://localhost:7500/",
      data: {}
    };
    const emptyDataCurl = new CurlHelper(emptyConfig);
    expect(emptyDataCurl.getBody()).toBe("--data '{}'");
    done();
  });

  it("should return a string with headers", (done) => {
    expect(curl.getHeaders()).toBe("-H \"Accept:application/json, text/plain, */*\" -H \"Content-Type:application/json;charset=utf-8\"");
    done();
  });

  it("should return a string with HTTP method", (done) => {
    expect(curl.getMethod()).toBe("-X POST");
    done();
  });

  it("should return a string with request body", (done) => {
    expect(curl.getBody()).toBe(`--data '{"dummy":"data"}'`);
    done();
  });

  it("should return the URL of the request", (done) => {
    expect(curl.getUrl()).toBe("http://localhost:7500/");
    done();
  });

  it("should return the queryString of the request", (done) => {
    expect(curl.getQueryString()).toBe("?testParam=test1&testParamTwo=test2");
    done();
  });
});
