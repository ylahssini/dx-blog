import mongoose, { Model } from 'mongoose';

const CategorySchema = new mongoose.Schema({
    original_name: {
        type: String,
        required: [true, 'You must provide the original name of the category'],
        index: true,
    },
    content: {
        type: [
            {
                locale: String,
                name: {
                    type: String,
                    required: [true, 'You must provide the name of the category']
                },
                description: {
                    type: String,
                    required: [true, 'You must provide the name of the category'],
                    default: '',
                },
            },
        ],
        required: [true, 'Something missing in your category data'],
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoIndex: true,
});

CategorySchema.index({ original_name: 1 }, { unique: true });

export interface ModelCategory extends Document {
    _id: string;
    original_name: string;
    content: {
        locale: string;
        name: string;
        description: string;
    }[];
    status: boolean;
    created_at: Date | number;
    updated_at: Date | number;
}

const Category = (
    mongoose.models.Category as Model<ModelCategory>
    || mongoose.model<ModelCategory>('Category', CategorySchema)
);

export default Category;
