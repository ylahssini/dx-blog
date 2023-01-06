import mongoose, { Model } from 'mongoose';

const SettingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'You must provide the name of blog site'],
        index: 'text',
    },
    logo: String,
    locales: [{ type: String }],
    under_construction: {
        type: Boolean,
        default: false,
    },
    under_maintenance: {
        type: Boolean,
        default: false,
    },
}, {
    autoIndex: true,
});

export interface ModelSetting extends Document {
    title: string;
    logo: string;
    locales: string[];
    under_construction: boolean;
    under_maintenance: boolean;
}

const Setting = mongoose.models.Setting as Model<ModelSetting> || mongoose.model<ModelSetting>('Setting', SettingSchema);

export default Setting;
