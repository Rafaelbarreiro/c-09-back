const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        require: true,
        minLength: [3, 'Must be at least 3 characters long, {VALUE} is not long enough'],
        maxLength: [20, 'Must be at most 20 characters long, {VALUE} is not supported']
    },
    img: {
        type: String,
        require: true
    }
})

module.exports = model ('Categories', CategorySchema)