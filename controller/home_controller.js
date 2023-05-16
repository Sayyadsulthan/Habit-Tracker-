const User = require('../models/user');
const Habit = require('../models/habits');

module.exports.index=async function(req, res){
    try{
        // let user = User.findById(req.user.id);
        // let habit =await Habit.findById()
        let user = await User.findById(req.user.id).populate('habits').exec();
        let date = new Date();

        return res.render('home',{
            title: "Tabit Tracking APP",
            habits: user.habits,
            // status: user.habits.currentStatus,
            date: date
        });
    }catch(err){
        console.log("err** :", err);
        return res.redirect('/');
    }
}