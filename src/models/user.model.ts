import Model from './index';
import { Schema, model } from 'mongoose';
import { MODEL_NAMES } from '../constants/common';

interface IUserAttributes {
    id: string;
    role_id: string;
    username: string;
    password: string;
    email: string;
    reset_password_token: string | null;
    blocked: boolean;
    created_at: string;
}
const UserSchema = new Schema<IUserAttributes>({
    id: String,
    role_id: String,
    username: String,
    password: String,
    email: { type: String, unique: true },
    reset_password_token: String,
    blocked: Boolean,
    created_at: Date,
});
export default class User extends Model<IUserAttributes> {
    private userModel;
    constructor() {
        super(MODEL_NAMES.USER, UserSchema);
        this.userModel = model(MODEL_NAMES.USER, UserSchema);
    }

    public getDuplicatedEmailUser = async (
        id: string,
        email: string
    ): Promise<any> => {
        return await this.userModel.findOne({
            id: { $ne: id },
            email,
        });
    };
}
