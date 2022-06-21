import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
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

    type: {
        type: String,
        enum: ['b2c', 'b2b'],
        default: 'b2c',
    },

    email: {
        type: String,
        required: [true, 'Please provide an email address of contact'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
    },

    gender: {
        type: String,
        enum: ['', 'male', 'female'],
        default: '',
    },

    password: {
        type: String,
        required: true,
        minlength: [8, 'The password must have more than 8 characters'],
    },

    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },

    addresses: {
        type: Array,
    },
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
