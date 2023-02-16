import mongoose, { Model } from 'mongoose';
import type { ModelCategory } from './category';
import './category'; // ! Don't remove this import

const BlogPostSchema = new mongoose.Schema({
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
    extended_metas: [{ key: String, value: String }],
    locale: String,
    path: {
        type: String,
        required: [true, 'You must provide the path of the post'],
        default: '',
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    equivalent_to_locale_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost',
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'blog_posts',
});

BlogPostSchema.index({ locale: -1, path: 1 }, { unique: true }); // ! set index before virtual 🤔

BlogPostSchema.virtual('category', {
    ref: 'Category',
    localField: 'category_id',
    foreignField: '_id',
    justOne: true,
});

export interface ModelBlogPost extends Document {
    _id: string;
    title: string;
    content: string;
    meta: {
        title: string;
        description: string;
        keywords: string;
    };
    extended_metas: { key: string; value: string }[];
    locale: string;
    path: string;
    category_id: string;
    equivalent_to_locale_post: string;
    status: 'DRAFT' | 'DISABLED' | 'PUBLISHED';
    created_at: Date | number;
    updated_at: Date | number;
    category: ModelCategory;
}

const BlogPost = (
    mongoose.models.BlogPost as Model<ModelBlogPost>
    || mongoose.model<ModelBlogPost>('BlogPost', BlogPostSchema, 'blog_posts')
);

export default BlogPost;
