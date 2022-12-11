import { NextFunction, Response, Request } from "express";
import HttpStatusCode from "../../../../shared/httpStatusCode";
import { ErrorResponse, SuccessResponse } from "../../../../shared/apiService";
import MovieInfoModel from "../../../../db/models/MovieInfo";
import { IMovieInfo } from "../../../../shared/types";

export default class Repo {
  //MOVIES POST
  public static async createMovies(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const content: IMovieInfo = req.body;
      const populate = {
        path: "seasons",
        populate: { path: "season_info", populate: { path: "chapters" } },
      };
      const movie = await MovieInfoModel.create(content);
      const MovieCreated = await MovieInfoModel.findById(movie._id)
        .populate(populate)
        .populate("genres specifications");
      new SuccessResponse("Movie created successfully", MovieCreated).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }

  //MOVIES GET
  public static async getMovies(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const populate = {
        path: "seasons",
        populate: { path: "season_info", populate: { path: "chapters" } },
      };
      const movieInfo = await MovieInfoModel.find()
        .populate(populate)
        .populate("genres specifications");
      new SuccessResponse("Movies list obtained successfully", movieInfo).send(
        res
      );
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
  public static async getMovieById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const populate = {
        path: "seasons",
        populate: { path: "season_info", populate: { path: "chapters" } },
      };
      const movieInfoById = await MovieInfoModel.findById(id)
        .populate(populate)
        .populate("genres specifications");
      new SuccessResponse("Movie obtained successfully", movieInfoById).send(
        res
      );
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }

  //MOVIES PUT
  public static async updateMovieById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const update: IMovieInfo = req.body;
      const populate = {
        path: "seasons",
        populate: { path: "season_info", populate: { path: "chapters" } },
      };
      await MovieInfoModel.findByIdAndUpdate(id, update);
      const movieUpdated = await MovieInfoModel.findById(id)
        .populate(populate)
        .populate("genres specifications");
      new SuccessResponse("Movie updated successfully", movieUpdated).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }

  //MOVIES DELETE
  public static async deleteMovieById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const populate = {
        path: "seasons",
        populate: { path: "season_info", populate: { path: "chapters" } },
      };
      const movieDeleted = await MovieInfoModel.findByIdAndDelete(id)
        .populate(populate)
        .populate("genres specifications");
      new SuccessResponse("Movie deleted successfully", movieDeleted).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
}
