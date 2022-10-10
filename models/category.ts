import mongoose, { Model } from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must provide the name of product'],
    },
    description: {
        type: String,
        default: '',
    },
    status: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

export interface ModelCategory extends Document {
    id: string;
    name: string;
    description: string;
    status: boolean;
    createdAt: Date | number;
    updatedAt: Date | number;
}

const Category = (
    mongoose.models.Category as Model<ModelCategory>
    || mongoose.model<ModelCategory>('Category', CategorySchema)
);

export default Category;
