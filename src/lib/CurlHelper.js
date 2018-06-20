export class CurlHelper {
    constructor(config) {
        this.request = config;
        this.curlCommand = '';
    }

    getHeaders() {
        return '';
    }

    getMethod() {
        return '';
    }

    getBody() {
        return '';
    }

    getUrl() {
        return '';
    }

    generateCommand() {
        this.curlCommand = `curl ${this.getMethod()} ${this.getHeaders()} ${this.getBody()} ${this.getUrl()}`;
        return this.curlCommand;
    }
}
