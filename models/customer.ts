import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide the name of customer'],
        },

        is_company: {
            type: Boolean,
            default: false,
        },

        status: {
            type: Boolean,
            default: true,
        },

        contacts: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Contact',
            }],
        },
        
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    },
);

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
