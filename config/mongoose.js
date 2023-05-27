const mongoose = require('mongoose');

mongoose
    .connect(`mongodb+srv://asulthan088:Asulthan088@habit-tracker-cluster.sump3er.mongodb.net/?retryWrites=true&w=majority`)
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