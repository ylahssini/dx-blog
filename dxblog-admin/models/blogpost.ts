import mongoose, { Model } from 'mongoose';
import type { ModelCategory } from './category';
import './category'; // ! Don't remove this import

const BlogPostSchema = new mongoose.Schema({
    original_title: {
        type: String,
        required: [true, 'You must provide the original title of the post'],
        index: true,
    },
    content: {
        type: [
            {
                locale: String,
                title: {
                    type: String,
                    required: [true, 'You must provide the title of the post']
                },
                path: {
                    type: String,
                    required: [true, 'You must provide the path of the post']
                },
                body: String,
                metas: {
                    title: {
                        type: String,
                        required: [true, 'You must provide the meta title of the post']
                    },
                    description: {
                        type: String,
                        required: [true, 'You must provide the meta description of the post']
                    },
                    keywords: String,
                },
            },
        ],
        required: [true, 'Something missing in your post data'],
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
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

BlogPostSchema.index({ original_title: 1 }, { unique: true });
BlogPostSchema.index({ 'content.locale': 1, 'content.path': 1 }, { unique: true });

// ! virtual must be the last one to be set 🤔
BlogPostSchema.virtual('category', {
    ref: 'Category',
    localField: 'category_id',
    foreignField: '_id',
    justOne: true,
});

export interface ModelBlogPost extends Document {
    _id: string;
    original_title: string;
    content: {
        locale: string;
        title: string;
        content: string;
        path: string;
        metas: {
            title: string;
            description: string;
            keywords: string;
        };
    }[];
    extended_metas: { key: string; value: string }[];
    category_id: string;
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
