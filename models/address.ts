import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema(
    {
        street: {
            type: String,
            required: [true, 'Please provide the street'],
        },

        house_number: {
            type: Number,
            required: [true, 'Please provide the house number'],
        },

        code_postal: {
            type: Number,
            required: [true, 'Please provide the code postal'],
        },

        type: {
            type: String,
            enum: ['shipping', 'billing'],
            default: 'billing',
        },

        country: {
            type: String,
            required: [true, 'Please provide the country'],
            maxlength: 2,
        },

        city: {
            type: String,
            required: [true, 'Please provide the city'],
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    },
);

export default mongoose.models.Address || mongoose.model('Address', AddressSchema);
