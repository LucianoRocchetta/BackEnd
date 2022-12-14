import { AutoIncrementID } from "@typegoose/auto-increment";
import { prop, getModelForClass, plugin, Ref } from "@typegoose/typegoose";
import { SeasonInfo } from "./SeasonInfo";

@plugin(AutoIncrementID, { startAt: 1 })
export class Season {
  @prop({ type: Number })
  _id: number;
  @prop({ type: Number })
  movie_id: Number;
  @prop({ trim: true, type: String })
  season_name?: string;
  @prop({ required: true, type: Number })
  season_number: number;
  @prop({ type: Number, ref: () => SeasonInfo })
  season_info: Ref<SeasonInfo>;
}
const SeasonModel = getModelForClass(Season);
export default SeasonModel;
