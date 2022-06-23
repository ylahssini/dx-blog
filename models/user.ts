import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            required: [true, 'Please provide first name of contact'],
            maxlength: [60, 'First name cannot be more than 60 characters'],
        },

        email: {
            type: String,
            required: [true, 'Please provide an email address of contact'],
            trim: true,
            lowercase: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
        },

        role: {
            type: String,
            enum: [null, 'admin', 'crm', 'order'],
            default: 'order',
        },

        password: {
            type: String,
            required: true,
            minlength: [8, 'The password must have more than 8 characters'],
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    },
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
