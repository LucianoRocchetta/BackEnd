import { NextFunction, Response, Request } from "express";
import HttpStatusCode from "../../../../shared/httpStatusCode";
import { ErrorResponse, SuccessResponse } from "../../../../shared/apiService";
import SpecificationModel from "../../../../db/models/Specification";
import { ISpecification } from "../../../../shared/types";

export default class Repo {
  //SPECIFICATION POST
  public static async createSpecification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const Specification: ISpecification = req.body;
      await SpecificationModel.create(Specification);
      new SuccessResponse(
        "Specification created successfully",
        Specification
      ).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
  //SPECIFICATION GET
  public static async getSpecifications(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await SpecificationModel.find();
      new SuccessResponse(
        "Specification list obtained successfully",
        response
      ).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
  public static async getSpecificationById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const specification = await SpecificationModel.findById(id);
      new SuccessResponse(
        "Specification list obtained successfully",
        specification
      ).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
  //SPECIFICATION PUT
  public static async updateSpecificationById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const update: ISpecification = req.body;
      await SpecificationModel.findByIdAndUpdate(id, update);
      const specificationUpdated = await SpecificationModel.findById(id);
      new SuccessResponse(
        "Specification list obtained successfully",
        specificationUpdated
      ).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
}
