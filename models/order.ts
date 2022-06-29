import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        public_id: {
            type: String,
            required: true,
        },

        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },

        status: {
            type: String,
            enum: ['new', 'picked', 'shipping', 'delivered', 'cancelled'],
            default: 'new',
        },

        total_piece: {
            type: Number,
        },

        payment: {
            status: {
                type: String,
                enum: [null, 'waiting', 'paid', 'rejected'],
                default: null,
            },
            method: {
                type: String,
                enum: [null, 'card', 'cash', 'bank_transfer'],
                default: null,
            }
        },

        product_items: [new mongoose.Schema(
            {
                product_id: String,
                quantity: Number,
                price: Number
            },
            {
                timestamps: {
                    createdAt: 'created_at',
                    updatedAt: 'updated_at',
                }
            },
        )],
        
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    },
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
