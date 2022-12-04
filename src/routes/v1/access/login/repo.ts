import { NextFunction, Response, Request } from "express";
import HttpStatusCode from "../../../../shared/httpStatusCode";
import { ErrorResponse, SuccessResponse } from "../../../../shared/apiService";
import UserModel from "../../../../db/models/User";

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

  public static async test(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const response = await UserModel.create({ email, password });

      new SuccessResponse("User created successfully", {
        email,
        password,
      }).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
}
