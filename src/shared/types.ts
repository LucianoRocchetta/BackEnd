export interface IGenre {
  name: string;
}
export interface IChapter {
  season_info_id: number;
  name?: string;
  length: number;
  cover_url?: string;
  video_url?: string;
}
export interface ISeasonInfo {
  season_id: number;
  chapters_length: number;
  chapters: number[];
}
export interface ISeason {
  movie_id: number;
  season_name?: string;
  season_number: number;
  season_info: number;
}
export interface ISpecification {
  name: string;
}
export interface IMovieInfo {
  name: string;
  genres: number[];
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
