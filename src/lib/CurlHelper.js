export class CurlHelper {
    constructor(config) {
        this.request = config;
    }

    getHeaders() {
        let headers = this.request.headers,
            curlHeaders = '';

        //get the headers concerning the appropriate method
        if(headers.hasOwnProperty('common')) {
            headers = this.request.headers[this.request.method];
        }
        
        for(let property in headers) {
            let header = `${property}:${headers[property]}`;
            curlHeaders = `${curlHeaders} -H "${header}"`
        }

        return curlHeaders.trim();
    }

    getMethod() {
        return `-X ${this.request.method.toUpperCase()}`;
    }

    getBody() {
        let data = (typeof this.request.data === 'object' || typeof this.request.data === 'array') ? JSON.stringify(this.request.data) : this.request.data;
        return `--data ${data}`.trim();
        
    }

    getUrl() {
        return this.request.url.trim();
    }

    generateCommand() {
        return `curl ${this.getMethod()} ${this.getHeaders()} ${this.getBody()} ${this.getUrl()}`.trim();
    }
}
