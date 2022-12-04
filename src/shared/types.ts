export interface IGenre {
  name: string;
}
export interface ISeason {
  season_name: string;
  nro_season: number;
  nro_chapters: number;
}
export interface ISpecification {
  name: string;
}
export interface IMovieInfo {
  name: string;
  genres: [];
  duration?: Number;
  description: string;
  type: "movie" | "series";
  image_cover: string;
  seasons?: [];
  movie_url?: string;
  trailer_url?: string;
  score?: number;
  date?: string;
  logo_url?: string;
  specifications?: [];
}
