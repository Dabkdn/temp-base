import Model from './index';
import { Schema, model } from 'mongoose';

interface IMetadataAttributes {
    id: string;
    status: number;
    uploaded: any;
    created_at: string;
}
const metadataSchema = new Schema<IMetadataAttributes>({
    id: String,
    status: Number,
    uploaded: { type: Object },
    created_at: Date,
});
export default class Metadata extends Model<IMetadataAttributes> {
    constructor() {
        super('metadata', metadataSchema);
    }
}
