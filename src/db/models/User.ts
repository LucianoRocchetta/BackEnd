import { getModelForClass, prop } from '@typegoose/typegoose';

class User {
    @prop({required: true, trim: true, type: String})
    email: string;
    @prop({required: true, trim: true, type: String}) 
    password: string;
}

const UserModel = getModelForClass(User)
export default UserModel;