class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  path: string | undefined;
  value: string | undefined;
  code: number | undefined;
  keyValue!: Object;

  constructor(message: string | undefined, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
