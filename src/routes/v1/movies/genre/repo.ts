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
      const content: IGenre = req.body;
      const genre = await GenreModel.create(content);
      new SuccessResponse("Genre created successfully", genre).send(res);
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
      const genresList = await GenreModel.find();
      new SuccessResponse("Genres list obtained successfully", genresList).send(
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
      const genreById = await GenreModel.findById(id);
      new SuccessResponse("Genre obtained successfully", genreById).send(res);
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

  //GENRE DELETE
  public static async deleteGenre(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const genreDeleted = await GenreModel.findByIdAndDelete(id);
      new SuccessResponse("Genre deleted successfully", genreDeleted).send(res);
    } catch (e: any) {
      new ErrorResponse(e.message, HttpStatusCode.NOT_FOUND).send(res);
    }
  }
}
