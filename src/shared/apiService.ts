import { NextFunction, Response } from "express";
import HttpStatusCode from "./httpStatusCode";

enum StatusCode {
  SUCCESS = "10000",
  FAILURE = "10001",
  RETRY = "10002",
}

export default class ApiService {
  constructor(
    protected statusCode: StatusCode,
    protected status: HttpStatusCode,
    protected message: string
  ) {}

  protected prepare<T extends ApiService>(
    res: Response,
    response: T
  ): Response {
    return res.status(this.status).json(ApiService.sanitize(response));
  }

  public prepareError<T extends ApiService>(next: NextFunction, error: T) {
    return next(JSON.stringify(ApiService.sanitize(error)));
  }

  public send(res: Response): Response {
    return this.prepare<ApiService>(res, this);
  }

  private static sanitize<T extends ApiService>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // if(clone.status) delete clone.status;
    for (const i in clone) if (typeof clone[i] === "undefined") delete clone[i];
    console.log(clone);
    return clone;
  }
}
export class SuccessResponse<T> extends ApiService {
  constructor(message: string, private data: T) {
    super(StatusCode.SUCCESS, HttpStatusCode.CREATED, message);
  }

  send(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, this);
  }
}
export class ErrorResponse<T> extends ApiService {
  constructor(message: string, httpStatusCode: HttpStatusCode) {
    super(StatusCode.FAILURE, httpStatusCode, message);
  }

  send(res: Response): Response {
    return super.prepare<ErrorResponse<T>>(res, this);
  }

  next(next: NextFunction) {
    return super.prepareError<ErrorResponse<T>>(next, this);
  }
}
