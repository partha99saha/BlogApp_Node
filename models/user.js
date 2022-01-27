const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: true
        },
        posts: [{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }]
    },
);

module.exports = mongoose.model('User', userSchema);
