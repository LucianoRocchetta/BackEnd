import { NextFunction, Response, Request } from "express";
import HttpStatusCode from "../../../../shared/httpStatusCode";
import { ErrorResponse, SuccessResponse } from "../../../../shared/apiService";
import GenreModel from "../../../../db/models/Genre";
import { IGenre } from "../../../../shared/types";

export default class Repo {
  //GENRE POST
  public static async createGenre(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const Genre: IGenre = req.body;
      const response = await GenreModel.create(Genre);

      new SuccessResponse("Genre created successfully", Genre).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }

  //GENRE GET
  public static async getGenres(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await GenreModel.find();
      new SuccessResponse("Genres list obtained successfully", response).send(
        res
      );
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
  public static async getGenreById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const response = await GenreModel.findById(id);
      new SuccessResponse("Genre obtained successfully", response).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }

  //GENRE PUT
  public static async updateGenre(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const update = req.body;
      await GenreModel.findByIdAndUpdate(id, update);
      const genreUpdated = await GenreModel.findById(id);
      new SuccessResponse("Genre updated successfully", genreUpdated).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
}
