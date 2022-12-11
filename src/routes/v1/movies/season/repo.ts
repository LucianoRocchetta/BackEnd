import { NextFunction, Response, Request } from "express";
import HttpStatusCode from "../../../../shared/httpStatusCode";
import { ErrorResponse, SuccessResponse } from "../../../../shared/apiService";
import SeasonModel from "../../../../db/models/Season";
import { ISeason } from "../../../../shared/types";
import MovieInfoModel from "../../../../db/models/MovieInfo";
import SeasonInfoModel from "../../../../db/models/SeasonInfo";
import ChapterModel from "../../../../db/models/Chapter";

export default class Repo {
  //SEASON POST
  public static async createSeason(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const content: ISeason = req.body;
      const movie = await MovieInfoModel.findById(id);
      if (movie) {
        const newSeasonInfo = await SeasonModel.create({
          ...content,
          movie_id: id,
        });
        new SuccessResponse("Season created successfully", newSeasonInfo).send(
          res
        );
      } else {
        new ErrorResponse("Movie id not found", HttpStatusCode.NOT_FOUND).send(
          res
        );
      }
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
      const seasonById = await SeasonModel.findById(id);
      new SuccessResponse("Season obtained successfully", seasonById).send(res);
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
  public static async updateSeasonToOtherChanges(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const seasonsInfo = await SeasonInfoModel.find({ season_id: id });
      const IdSeasonInfo = seasonsInfo[0]._id;
      if (IdSeasonInfo) {
        await SeasonModel.findByIdAndUpdate(id, {
          season_info: IdSeasonInfo,
        });
        const chapters = await ChapterModel.find({
          season_info_id: IdSeasonInfo,
        });
        const chaptersIds = chapters.map(({ _id }) => _id);
        if (chaptersIds) {
          await SeasonInfoModel.findByIdAndUpdate(IdSeasonInfo, {
            length: chaptersIds.length,
            chapters: chaptersIds,
          });
        }
        const seasonUpdated = await SeasonModel.findById(id).populate({
          path: "season_info",
          populate: { path: "chapters" },
        });
        new SuccessResponse("Season updated successfully", seasonUpdated).send(
          res
        );
      } else {
        new ErrorResponse(
          "Error id_season not found",
          HttpStatusCode.NOT_FOUND
        ).send(res);
      }
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }

  //SEASON DELETE
  public static async deleteSeasonById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const seasonDeleted = await SeasonModel.findById(id);
      await SeasonModel.findByIdAndDelete(id);
      new SuccessResponse("Season deleted successfully", seasonDeleted).send(
        res
      );
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
}
