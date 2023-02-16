const {Schema, model} = require('mongoose');

const CardsSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    subtitle: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    description: {
        type: String,
        require: true
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