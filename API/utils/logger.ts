type RequestLogData = {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: unknown;
};

type LogEntry = { type: string; data: unknown };

export class APILogger {
  private recentLogs: LogEntry[] = [];

  logReguest(method: string, url: string, headers: Record<string, string>, body?: unknown) {
    const logEntry: RequestLogData = { method, url, headers, body };
    this.recentLogs.push({ type: 'Request details', data: logEntry });
  }

  logResponse(statusCode: number, responseBody: unknown) {
    const logEntry = { statusCode, responseBody };
    this.recentLogs.push({ type: 'Response details', data: logEntry });
  }

  getResentLogs() {
    const logs = this.recentLogs
      .map((log) => `===${log.type}===\n${JSON.stringify(log.data, null, 4)}`)
      .join('\n\n');
    return logs;
  }
}
