import { NextFunction, Response, Request } from "express";
import HttpStatusCode from "../../../../shared/httpStatusCode";
import { ErrorResponse, SuccessResponse } from "../../../../shared/apiService";
import SeasonModel from "../../../../db/models/Season";
import { ISeason } from "../../../../shared/types";

export default class Repo {
  //SEASON POST
  public static async createSeason(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const Season: ISeason = req.body;
      await SeasonModel.create(Season);
      new SuccessResponse("Season created successfully", Season).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
  //SEASON GET
  public static async getSeasons(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const seasons = await SeasonModel.find();
      new SuccessResponse("Season list obtained successfully", seasons).send(
        res
      );
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
  public static async getSeasonById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const season = await SeasonModel.findById(id);
      new SuccessResponse("Season obtained successfully", season).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
  //SEASON PUT
  public static async updateSeasonById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const update: ISeason = req.body;
      await SeasonModel.findByIdAndUpdate(id, update);
      const seasonUpdated = await SeasonModel.findById(id);
      new SuccessResponse("Season updated successfully", seasonUpdated).send(
        res
      );
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
}
