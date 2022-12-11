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
      const content: ISpecification = req.body;
      const specification = await SpecificationModel.create(content);
      new SuccessResponse(
        "Specification created successfully",
        specification
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
      const specifications = await SpecificationModel.find();
      new SuccessResponse(
        "Specification list obtained successfully",
        specifications
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
      const specificationById = await SpecificationModel.findById(id);
      new SuccessResponse(
        "Specification list obtained successfully",
        specificationById
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
        "Specification updated successfully",
        specificationUpdated
      ).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }

  //SPECIFICATION DELETE
  public static async deleteSpecificationById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const specificationDeleted = await SpecificationModel.findByIdAndDelete(
        id
      );
      new SuccessResponse(
        "Specification deleted successfully",
        specificationDeleted
      ).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
}
