import { AutoIncrementID } from "@typegoose/auto-increment";
import { prop, getModelForClass, Ref, plugin } from "@typegoose/typegoose";
import { Genre } from "./Genre";
import { Season } from "./Season";
import { Specification } from "./Specification";

@plugin(AutoIncrementID, { startAt: 1 })
class MovieInfo {
  @prop({ type: Number })
  _id: number;
  @prop({ required: true, trim: true, type: String })
  name: string;
  @prop({ required: true, ref: () => Genre, type: Array })
  genres: Ref<Genre>[];
  @prop({ type: Number })
  duration?: Number;
  @prop({ required: true, trim: true, type: String })
  description: string;
  @prop({ required: true, type: String })
  type: "movie" | "series";
  @prop({ required: true, type: String })
  image_cover: string;
  @prop({ ref: () => Season, type: Array })
  seasons?: Ref<Season>[];
  @prop({ type: String })
  movie_url?: string;
  @prop({ type: String })
  trailer_url?: string;
  @prop({ required: true, type: Number })
  score?: number;
  @prop({ required: true, type: String })
  date?: string;
  @prop({ type: String })
  logo_url?: string;
  @prop({ ref: () => Specification, type: Array })
  specifications?: Ref<Specification>[];
}
const MovieInfoModel = getModelForClass(MovieInfo);
export default MovieInfoModel;
