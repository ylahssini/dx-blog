import mongoose, { Model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT = 12;

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, 'Please provide first name of contact'],
            maxlength: [60, 'First name cannot be more than 60 characters'],
        },

        last_name: {
            type: String,
            required: [true, 'Please provide last name of contact'],
            maxlength: [60, 'Last name cannot be more than 60 characters'],
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
            enum: [null, 'admin', 'sales', 'order'],
            default: 'order',
        },

        password: {
            type: String,
            required: true,
            minlength: [8, 'The password must have more than 8 characters'],
        },

        status: {
            type: Boolean,
            required: true,
            default: true,
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    },
);

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT, (error, salt) => {
        if (error) return next(error);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (userPassword, next) {
    bcrypt.compare(userPassword, this.password, (error, isMatched) => {
        if (error) return next(error);

        next(null, isMatched);
    });
};

export interface ModelUser extends Document {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: null | 'admin' | 'sales' | 'order',
    password: string;
    status: boolean;
    createdAt: Date | number;
    updatedAt: Date | number;
}

const User = (
    mongoose.models.User as Model<ModelUser>
    || mongoose.model<ModelUser>('User', UserSchema)
);

export default User;
