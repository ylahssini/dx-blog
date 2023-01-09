import mongoose, { Model } from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'You must provide the title of the post'],
        index: 'text',
    },
    content: {
        type: String,
        required: [true, 'You must provide the content of the post'],
        default: '',
        index: 'content',
    },
    meta: {
        title: {
            type: String,
            required: [true, 'You must provide the meta title of the post'],
        },
        description: {
            type: String,
            required: [true, 'You must provide the meta description of the post'],
        },
        keywords: String,
    },
    locale: String,
    path: {
        type: String,
        required: [true, 'You must provide the slug of the post'],
        default: '',
        index: 'slug',
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    equivalent_to_locale_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    status: {
        type: String,
        enum: ['DRAFT', 'DISABLED', 'PUBLISHED'],
        default: 'DRAFT',
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

export interface ModelPost extends Document {
    _id: string;
    title: string;
    content: string;
    meta: {
        title: string;
        description: string;
        keywords: string;
    };
    locale: string;
    path: string;
    category_id: string;
    equivalent_to_locale_post: string;
    status: 'DRAFT' | 'DISABLED' | 'PUBLISHED',
    created_at: Date | number;
    updated_at: Date | number;
}

const Post = (
    mongoose.models.Post as Model<ModelPost>
    || mongoose.model<ModelPost>('Category', PostSchema)
);

export default Post;
