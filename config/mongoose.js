const mongoose = require('mongoose');
require('dotenv').config();

mongoose
    .connect(process.env.DB_URI)
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
