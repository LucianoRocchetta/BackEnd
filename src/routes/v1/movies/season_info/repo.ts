import { NextFunction, Response, Request } from "express";
import HttpStatusCode from "../../../../shared/httpStatusCode";
import { ErrorResponse, SuccessResponse } from "../../../../shared/apiService";
import { ISeasonInfo } from "../../../../shared/types";
import SeasonInfoModel from "../../../../db/models/SeasonInfo";
import SeasonModel from "../../../../db/models/Season";

export default class Repo {
  //SEASON-INFO POST
  public static async createSeasonInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const content: ISeasonInfo = req.body;

      const season = await SeasonModel.findById(id);
      if (season) {
        const SeasonInfoCreated = await SeasonInfoModel.create({
          ...content,
          season_id: id,
        });
        new SuccessResponse(
          "SeasonInfo created successfully",
          SeasonInfoCreated
        ).send(res);
      } else {
        new ErrorResponse(
          "Error season_id not found",
          HttpStatusCode.NOT_FOUND
        ).send(res);
      }
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }

  //SEASON-INFO GET
  public static async getSeasonInfos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const seasonInfos = await SeasonInfoModel.find();
      new SuccessResponse(
        "Season list obtained successfully",
        seasonInfos
      ).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
  public static async getSeasonInfoById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const seasonInfoById = await SeasonInfoModel.findById(id);
      new SuccessResponse(
        "Season info obtained successfully",
        seasonInfoById
      ).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }

  //SEASON-INFO PUT
  public static async updateSeasonInfoById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const update: ISeasonInfo = req.body;
      await SeasonInfoModel.findByIdAndUpdate(id, update);
      const seasonInfoUpdated = await SeasonInfoModel.findById(id);
      new SuccessResponse(
        "Season info updated successfully",
        seasonInfoUpdated
      ).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }

  //SEASON-INFO DELETE
  public static async deleteSeasonInfoById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const elementDeleted = await SeasonInfoModel.findByIdAndDelete(id);
      new SuccessResponse(
        "Season info deleted successfully",
        elementDeleted
      ).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
}
