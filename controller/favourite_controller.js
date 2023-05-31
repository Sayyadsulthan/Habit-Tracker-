const User = require('../models/user');
const Habit = require('../models/habits');

module.exports.favouriteDashboard = async function (req, res) {
    if (req.isAuthenticated()) {


        try {

            let user = await User.findById(req.user.id).populate('habits').exec();
            let date = new Date();
            return res.render('favourite', {
                title: "Tabit Tracking APP",
                habits: user.habits,
                // status: user.habits.currentStatus,
                date: date,
            });
        } catch (err) {
            console.log("err** :", err);
            return res.redirect('/');
        }
    } else {
        req.flash('error', 'Internal server Error');
        res.redirect('back')
    }
}