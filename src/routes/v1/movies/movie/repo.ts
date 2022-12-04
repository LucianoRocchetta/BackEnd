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
      const movie: IMovieInfo = req.body;
      await MovieInfoModel.create(movie);
      const movieCreated = MovieInfoModel.findOne(movie).populate(
        "genres seasons score specifications",
        "name season_name season_number season_chapters score_points"
      );
      new SuccessResponse("Movie created successfully", movieCreated).send(res);
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
      const response = await MovieInfoModel.find().populate(
        "genres seasons score specifications",
        "name season_name season_number season_chapters score_points"
      );
      new SuccessResponse("Movies list obtained successfully", response).send(
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
      await MovieInfoModel.findByIdAndUpdate(id, update);
      const movieUpdated = await MovieInfoModel.findById(id).populate(
        "genres seasons score specifications",
        "name season_name season_number season_chapters score_points"
      );
      new SuccessResponse("Movie updated successfully", movieUpdated).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
}
