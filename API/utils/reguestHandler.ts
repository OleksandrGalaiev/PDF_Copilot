import { APIRequestContext } from 'playwright';
import { APILogger } from './logger';

export class RequestHandler {
  private apiDefaultUrl: string;
  private request: APIRequestContext;
  private apiUrl: string | undefined;
  private apiPath: string = '';
  private apiParams: Record<string, string> = {};
  private apiBody: Record<string, string | number | boolean> = {};
  private apiHeaders: Record<string, string> = {};
  private logger: APILogger;

  constructor(request: APIRequestContext, apiBeseUrl: string, logger: APILogger) {
    this.request = request;
    this.apiDefaultUrl = apiBeseUrl;
    this.logger = logger;
  }

  url(url: string) {
    this.apiUrl = url;
    return this;
  }

  path(path: string) {
    this.apiPath = path;
    return this;
  }

  params(params: Record<string, string>) {
    this.apiParams = params;
    return this;
  }

  body(body: Record<string, string | number | boolean>) {
    this.apiBody = body;
    return this;
  }

  headers(headers: Record<string, string>) {
    this.apiHeaders = headers;
    return this;
  }

  private getUrl() {
    const url = new URL(`${this.apiUrl ?? this.apiDefaultUrl}${this.apiPath}`);
    for (const [key, value] of Object.entries(this.apiParams)) {
      url.searchParams.append(key, value);
    }
    return url.toString();
  }

  async GET_Request<T = unknown>(statusCode: number): Promise<T> {
    const url = this.getUrl();
    this.logger.logReguest('GET', url, this.apiHeaders);

    const response = await this.request.get(url, { headers: this.apiHeaders });
    this.cleanUpFileds();

    const actualStatus = response.status();
    const data = (await response.json()) as T;
    this.logger.logResponse(actualStatus, data);
    this.statusCodeValidator(actualStatus, statusCode);
    return data;
  }

  async POST_Request<T = unknown>(statusCode: number): Promise<T> {
    const url = this.getUrl();
    this.logger.logReguest('POST', url, this.apiHeaders, this.apiBody);
    const isForm = this.apiHeaders['content-type'] === 'application/x-www-form-urlencoded';
    const response = await this.request.post(url, {
      headers: this.apiHeaders,
      form: isForm ? this.apiBody : undefined,
      data: !isForm ? this.apiBody : undefined,
    });
    this.cleanUpFileds();
    const actualStatus = response.status();
    const data = (await response.json()) as T;

    this.logger.logResponse(actualStatus, data);
    this.statusCodeValidator(actualStatus, statusCode);
    return data;
  }

  private statusCodeValidator(actualCode: number, expectedCode: number) {
    if (actualCode !== expectedCode) {
      const logs = this.logger.getResentLogs();
      throw new Error(
        `Expected status code is ${expectedCode} but got ${actualCode}\n\n Actual API info: ${logs}`,
      );
    }
  }

  private cleanUpFileds() {
    this.apiBody = {};
    this.apiHeaders = {};
    this.apiParams = {};
    this.apiPath = '';
    this.apiUrl = undefined;
  }
}
