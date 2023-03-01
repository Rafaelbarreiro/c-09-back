const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        minLength: [3, 'Must be at least 3 characters long, {VALUE} is not long enough'],
        maxLength: [20, 'Must be at most 20 characters long, {VALUE} is not supported']
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']
    },
    nickname:{
        type: String,
        require: true,
    },
    img:{
        type: String,
        require: true,
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
    //add img
})

module.exports =  model('User', UserSchema)