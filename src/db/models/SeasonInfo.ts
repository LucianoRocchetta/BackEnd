import { AutoIncrementID } from "@typegoose/auto-increment";
import { prop, getModelForClass, plugin, Ref } from "@typegoose/typegoose";

import { Chapter } from "./Chapter";
@plugin(AutoIncrementID, { startAt: 1 })
export class SeasonInfo {
  @prop({ type: Number })
  public _id: number;
  @prop({ type: Number })
  season_id: Number;
  @prop({ type: Number })
  chapters_length: number;
  @prop({ autopoputale: true, type: Array, ref: () => Chapter })
  chapters: Ref<Chapter>[];
}
const SeasonInfoModel = getModelForClass(SeasonInfo);
export default SeasonInfoModel;
