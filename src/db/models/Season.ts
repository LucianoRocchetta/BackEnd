import { AutoIncrementID } from "@typegoose/auto-increment";
import { prop, getModelForClass, plugin } from "@typegoose/typegoose";
@plugin(AutoIncrementID, { startAt: 1 })
export class Season {
  @prop({ type: Number })
  public _id: number;
  @prop({ trim: true, type: String })
  name?: string;
  @prop({ required: true, type: Number })
  season_number: number;
  @prop({ required: true, type: Number })
  season_chapters: number;
}
const SeasonModel = getModelForClass(Season);
export default SeasonModel;
