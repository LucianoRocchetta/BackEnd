import { NextFunction, Response, Request } from "express";
import HttpStatusCode from "../../../shared/httpStatusCode";
import {
  ErrorResponse,
  SuccessResponse,
} from "../../../shared/apiService";

export default class Repo {
  public static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const isCredentials = email === "user@gmail.com" && password === "123123";

    if (isCredentials)
      return new SuccessResponse("User logged in!", {}).send(res);
    new ErrorResponse(
      "Please check your credentials",
      HttpStatusCode.NOT_FOUND
    ).send(res);
  }
}
