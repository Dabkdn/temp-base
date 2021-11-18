import Model from './index';
import { Schema, model } from 'mongoose';
import { MODEL_NAMES } from '../constants/common';

interface IRoleAttributes {
    id: string;
    name: string;
    created_at: string;
}
const RoleSchema = new Schema<IRoleAttributes>({
    id: String,
    name: { type: String, unique: true },
    created_at: Date,
});
export const RoleModel = model(MODEL_NAMES.ROLE, RoleSchema);
export default class Role extends Model<IRoleAttributes> {
    constructor() {
        super(MODEL_NAMES.ROLE, RoleSchema);
    }
}
