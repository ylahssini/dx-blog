import mongoose, { Model } from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must provide the name of product'],
    },
    description: String,
    photo: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    price: {
        type: Number,
        required: [true, 'You must provide the prive'],
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

export interface ModelProduct extends Document {
    id: string;
    name: string;
    description: string;
    photo: string;
    category: string;
    status: boolean;
    created_by: string | null;
    createdAt: Date | number;
    updatedAt: Date | number;
}

const Product = (
    mongoose.models.Product as Model<ModelProduct>
    || mongoose.model<ModelProduct>('Product', ProductSchema)
);

export default Product;
