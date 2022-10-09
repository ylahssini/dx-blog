import mongoose, { Model } from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must provide the name of product'],
    },
    description: String,
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
    createdAt: Date | number;
    updatedAt: Date | number;
}

const Category = (
    mongoose.models.Category as Model<ModelCategory>
    || mongoose.model<ModelCategory>('Category', CategorySchema)
);

export default Category;
