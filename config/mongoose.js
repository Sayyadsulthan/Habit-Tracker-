const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1:27017/checking-habit')
    .then(()=>console.log("db connectionsuccesfull.."))
    .catch((err)=>console.log("err in db: ", err))

const db = mongoose.connection;

db.on('error', function(err){
    console.log("***err in db: ", err)
})

db.once('open', function(){
    console.log("db connected..")
})

module.exports = db;