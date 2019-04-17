export class BodyHelper {
  constructor(headers, body) {
    this.body = body;
    this.contentType = this.getContentType(headers);
    this.parseBody();
  }

  parseBody() {
    if (typeof this.body !== 'undefined' && this.body !== '' && Object.keys(this.body).length) {
      // form-data
      if (
        typeof this.contentType === 'string' &&
        this.contentType.includes('application/x-www-form-urlencoded') &&
        typeof this.body === 'object'
      ) {
        this.curlBody = `--data '${this.getFormBody()}'`.trim();
      } else {
        this.curlBody = `--data '${this.getTextBody()}'`.trim();
      }
    } else {
      this.curlBody = '';
    }
  }

  // extract 'Content-Type' by request.headers
  getContentType(headers) {
    if (headers === undefined || headers === null) {
      return undefined;
    }
    let lowerHeaderArray = Object.entries(headers);
    var [contentTypeArray] = lowerHeaderArray.filter((header) => header[0].toLowerCase() === 'content-type');

    if (contentTypeArray === undefined) {
      return undefined;
    }
    return contentTypeArray[1];
  }

  getTextBody() {
    return typeof this.body === 'object' || typeof this.body === 'array' ? JSON.stringify(this.body) : this.body;
  }

  getFormBody() {
    return Object.entries(this.body)
      .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
  }

  toString() {
    return this.curlBody;
  }
}
