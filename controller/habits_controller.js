const Habit = require('../models/habits');

module.exports.create =async function(req, res){
    try{
        await Habit.create(req.body);
        
        console.log(req.body);
        console.log("habit created...");
        return res.redirect('back');

    }catch(err){
        console.log("err in create habit", err)
        return res.redirect('back')
    }
}

module.exports.destroy =async function(req, res){
    try{
        let habit = await Habit.findById(req.params.id);
           await habit.deleteOne();
        console.log("habit removed succesfully...");
        return res.redirect('back');

    }catch(err){
        console.log("err in removing habit", err)
        return res.redirect('back')
    }
}