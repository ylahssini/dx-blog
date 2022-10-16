import mongoose, { Model } from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must provide the name of product'],
        index: 'text',
    },
    description: {
        type: String,
        default: '',
        index: 'text2',
    },
    status: {
        type: Boolean,
        default: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    autoIndex: true,
});

export interface ModelCategory extends Document {
    _id: string;
    name: string;
    description: string;
    status: boolean;
    created_at: Date | number;
    updated_at: Date | number;
}

const Category = (
    mongoose.models.Category as Model<ModelCategory>
    || mongoose.model<ModelCategory>('Category', CategorySchema)
);

export default Category;
