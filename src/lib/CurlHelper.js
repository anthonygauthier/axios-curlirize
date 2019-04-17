import { BodyHelper } from './BodyHelper';

export class CurlHelper {
  constructor(config) {
    this.request = config;
  }

  getHeaders() {
    let headers = this.request.headers,
      curlHeaders = '';

    // If the header is empty, defend it.
    if (headers === undefined || headers === null) {
      return curlHeaders;
    }

    // get the headers concerning the appropriate method (defined in the global axios instance)
    if (headers.hasOwnProperty('common')) {
      headers = this.request.headers[this.request.method];
    }

    // add any custom headers (defined upon calling methods like .get(), .post(), etc.)
    for (let property in this.request.headers) {
      if (!['common', 'delete', 'get', 'head', 'patch', 'post', 'put'].includes(property)) {
        headers[property] = this.request.headers[property];
      }
    }

    for (let property in headers) {
      let header = `${property}:${headers[property]}`;
      curlHeaders = `${curlHeaders} -H "${header}"`;
    }

    return curlHeaders.trim();
  }

  getMethod() {
    return `-X ${this.request.method.toUpperCase()}`;
  }

  getBody() {
    // GET and DELETE have no body.
    if (['GET', 'DELETE'].indexOf(this.request.method.toUpperCase()) >= 0) {
      return '';
    }
    let bodyHelper = new BodyHelper(this.request.headers, this.request.data);
    return bodyHelper.toString();
  }

  getUrl() {
    return this.request.url.trim();
  }

  generateCommand() {
    return `curl ${this.getMethod()} ${this.getHeaders()} ${this.getBody()} ${this.getUrl()}`
      .trim()
      .replace(/\s{2,}/g, ' ');
  }
}
