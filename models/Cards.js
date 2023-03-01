const {Schema, model} = require('mongoose');

const CardsSchema = new Schema({
    title: {
        type: String,
        require: true,
        minLength: [5, 'Must be at least 5 characters long, {VALUE} is not long enough'],
        maxLength: [50, 'Must be at most 50 characters long, {VALUE} is not supported']
    },
    subtitle: {
        type: String,
        require: true,
        minLength: [10, 'Must be at least 10 characters long, {VALUE} is not long enough'],
        maxLength: [35, 'Must be at most 35 characters long, {VALUE} is not supported']
    },
    img: {
        type: String
    },
    description: {
        type: String,
        require: true,
        minLength: [20, 'Must be at least 20 characters long, {VALUE} is not long enough'],
        maxLength: [300, 'Must be at most 300 characters long, {VALUE} is not supported']
    },
    autor: {
        type: Schema.Types.String,
        ref: 'Users',
        default: "fundforall.org@gmail.com"
    },
    category: {
        type: Schema.Types.String,
        ref: 'Categories'
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    parcialAmount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'paused', 'finished', 'deleted' ],
        default: 'active'
    },
    finaldate:{
        type: Date
    }
},
//enum, 
{
  timestamps: true,
})

module.exports =  model('Cards', CardsSchema)