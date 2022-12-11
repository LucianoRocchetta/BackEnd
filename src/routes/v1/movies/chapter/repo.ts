import { NextFunction, Response, Request } from "express";
import HttpStatusCode from "../../../../shared/httpStatusCode";
import { ErrorResponse, SuccessResponse } from "../../../../shared/apiService";
import { IChapter } from "../../../../shared/types";
import SeasonInfoModel from "../../../../db/models/SeasonInfo";
import ChapterModel from "../../../../db/models/Chapter";

export default class Repo {
  //CHAPTER POST
  public static async createChapter(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const content: IChapter = req.body;
      const seasonInfo = await SeasonInfoModel.findById(id);
      console.log(id);
      if (seasonInfo) {
        const newChapter = await ChapterModel.create({
          ...content,
          season_info_id: id,
        });
        new SuccessResponse("Chapter created successfully", newChapter).send(
          res
        );
      } else {
        new ErrorResponse("Id not found", HttpStatusCode.NOT_FOUND).send(res);
      }
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }

  //CHAPTER GET
  public static async getChapters(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const chapters = await ChapterModel.find();
      new SuccessResponse("Chapter list obtained successfully", chapters).send(
        res
      );
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
  public static async getChapterById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const chapterById = await ChapterModel.findById(id);
      new SuccessResponse("Chapter obtained successfully", chapterById).send(
        res
      );
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }

  //CHAPTER PUT
  public static async updateChapterById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const update: IChapter = req.body;
      await ChapterModel.findByIdAndUpdate(id, update);
      const chapterUpdated = await ChapterModel.findById(id);
      new SuccessResponse("Chapter updated successfully", chapterUpdated).send(
        res
      );
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }

  //CHAPTER DELETE
  public static async deleteChapterById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const elementDeleted = await ChapterModel.findByIdAndDelete(id);
      new SuccessResponse("Chapter deleted successfully", elementDeleted).send(
        res
      );
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
}
