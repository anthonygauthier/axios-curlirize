export class CurlHelper {
  constructor(config) {
    this.request = config;
  }

  getHeaders() {
    let headers = this.request.headers,
      curlHeaders = "";

    // get the headers concerning the appropriate method (defined in the global axios instance)
    if (headers.hasOwnProperty("common")) {
      headers = this.request.headers[this.request.method];
    }

    // add any custom headers (defined upon calling methods like .get(), .post(), etc.)
    for (let property in this.request.headers) {
      if (
        !["common", "delete", "get", "head", "patch", "post", "put"].includes(
          property
        )
      ) {
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
    if (
      typeof this.request.data !== "undefined" &&
      this.request.data !== "" &&
      this.request.data !== null &&
      this.request.method.toUpperCase() !== "GET"
    ) {
      let data =
        typeof this.request.data === "object" ||
        Object.prototype.toString.call(this.request.data) === "[object Array]"
          ? JSON.stringify(this.request.data)
          : this.request.data;
      return `--data '${data}'`.trim();
    } else {
      return "";
    }
  }

  getUrl() {
    if (this.request.baseURL) {
      return this.request.baseURL + "/" + this.request.url;
    }
    return this.request.url;
  }

  getQueryString() {
    let params = "",
      i = 0;

    for (let param in this.request.params) {
      params +=
        i != 0
          ? `&${param}=${this.request.params[param]}`
          : `?${param}=${this.request.params[param]}`;
      i++;
    }

    return params;
  }

  getBuiltURL() {
    let url = this.getUrl();

    if (this.getQueryString() != "") {
      url = url.charAt(url.length - 1) == "/" ? url.substr(0, url.length - 1) : url;
      url += this.getQueryString();
    }

    return url.trim();
  }

  generateCommand() {
    return `curl ${this.getMethod()} ${this.getHeaders()} ${this.getBody()} "${this.getBuiltURL()}"`
      .trim()
      .replace(/\s{2,}/g, " ");
  }
}
