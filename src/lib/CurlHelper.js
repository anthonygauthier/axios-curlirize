export class CurlHelper {
    constructor(config) {
        this.request = config;
    }

    getHeaders() {
        const headers = this.request.headers;
        let curlHeaders = '';
        
        for(let property in headers) {
            curlHeaders = `${curlHeaders} -H "${property}:${headers[property]}"`
        }

        return curlHeaders;
    }

    getMethod() {
        return `-X ${this.request.method.toUpperCase()}`;
    }

    getBody() {
        let data = (typeof this.request.data === 'object' || typeof this.request.data === 'array') ? JSON.stringify(this.request.data) : this.request.data;
        return `--data ${JSON.stringify(this.request.data)}`;
        
    }

    getUrl() {
        return this.request.url;
    }

    generateCommand() {
        return `curl ${this.getMethod()} ${this.getHeaders()} ${this.getBody()} ${this.getUrl()}`;
    }
}
