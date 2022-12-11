import { AutoIncrementID } from "@typegoose/auto-increment";
import { prop, getModelForClass, plugin, Ref } from "@typegoose/typegoose";
@plugin(AutoIncrementID, { startAt: 1 })
export class Chapter {
  @prop({ type: Number })
  _id: number;
  @prop({ type: Number })
  season_info_id: Number;
  @prop({ trim: true, type: String })
  name?: string;
  @prop({ required: true, type: Number })
  length: number;
  @prop({ trim: true, type: String })
  cover_url?: string;
  @prop({ trim: true, type: String })
  video_url?: string;
}
const ChapterModel = getModelForClass(Chapter);
export default ChapterModel;
