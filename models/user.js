const mongoose = require('mongoose');

const userSchema =new  mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    habits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    }]
},{
    timestamps:true
})

let user = mongoose.model('User', userSchema);

module.exports = user;