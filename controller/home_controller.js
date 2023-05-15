const User = require('../models/user');
const Habit = require('../models/habits');

module.exports.index=async function(req, res){

    try{
        // let user = User.findById(req.user.id);
        let habit =await Habit.find({});
        return res.render('home',{
            title: "Tabit Tracking APP",
            habits: habit
        });
    }catch(err){
        console.log("err** :", err);
        return res.redirect('/');
    }
}