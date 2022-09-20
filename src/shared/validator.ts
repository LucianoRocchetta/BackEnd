import { NextFunction, Response, Request } from "express";
import Joi from "joi";
import HttpStatusCode from "./httpStatusCode";
import { ErrorResponse } from "./apiService";

export default (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req["body"]);
      if (!error) return next();
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");

      new ErrorResponse(message, HttpStatusCode.BAD_REQUEST).send(res);
    } catch (error: any) {
      new ErrorResponse(error, HttpStatusCode.INTERNAL_SERVER_ERROR).send(res);
    }
  };
