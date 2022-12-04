import { AutoIncrementID } from "@typegoose/auto-increment";
import { prop, getModelForClass, plugin } from "@typegoose/typegoose";
@plugin(AutoIncrementID, { startAt: 1 })
export class Specification {
  @prop({ type: Number })
  public _id: number;
  @prop({ required: true, trim: true, type: String })
  name: string;
}
const SpecificationModel = getModelForClass(Specification);
export default SpecificationModel;
