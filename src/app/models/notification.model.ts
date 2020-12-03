export class Notification {
  type: 'info' | 'warning' | 'error';
  message: string;
  timeout?: number;

  constructor(type: "info" | "warning" | "error", message: string, timeout: number = 10) {
    this.type = type;
    this.message = message;
    this.timeout = timeout;
  }
}
