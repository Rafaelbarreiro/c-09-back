const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    isAdmin:{
        type: String,
        default: "false"
    },
    status: {
        type: String,
        enum: ['active', 'banned', 'deleted' ],
        default: 'active'
    }
})

module.exports =  model('User', UserSchema)