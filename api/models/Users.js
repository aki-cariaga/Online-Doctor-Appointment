import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    img:{
        type: String,
        default: null,
    },
    isDoctor:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

export default mongoose.model('Users', userSchema)