import { AutoIncrementID } from "@typegoose/auto-increment";
import { prop, getModelForClass, plugin } from "@typegoose/typegoose";
@plugin(AutoIncrementID, { startAt: 1 })
export class Genre {
  @prop({ type: Number })
  _id: number;
  @prop({ required: true, trim: true, type: String })
  name: string;
}
const GenreModel = getModelForClass(Genre);
export default GenreModel;
