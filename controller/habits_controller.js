const Habit = require('../models/habits');
const User = require('../models/user');

module.exports.dashBoardIndex = async function (req, res) {
    if (req.isAuthenticated()) {
        try {
            weekName=['sun','mon','tue','wed','thu','fry','sat'];
            let user = await User.findById(req.user.id).populate('habits').exec();
            return res.render('habit-dashboard', {
                habits: user.habits,
                weekNames:weekName
            });
        } catch (err) {
            req.flash('error', err);
            return res.redirect("back");
        }
    } else {
        req.flash('error',"Internale server Error");
        return res.redirect("back");
    }
}

module.exports.create = async function (req, res) {
    
    try {

        if (req.user) {
            let habit = await Habit.create({
                content: req.body.content,
            });
            let user = await User.findById(req.user.id);
            user.habits.push(habit);
            let date = new Date();

            // console.log(newDate);
            for (i = 0; i < 7; i++) {
                let dd = date.getDate();
                let mm = date.getMonth() + 1;
                let yyy = date.getFullYear();
                if (i == date.getDay()) {
                    let newDate = dd + '/' + mm + '/' + yyy;
                    habit.currentStatus.push({ date: newDate, state: "undefine" });
                } else {
                    dd += (i - date.getDay());
                    let newDate = dd + '/' + mm + '/' + yyy;
                    habit.currentStatus.push({ date: newDate, state: "undefine" });
                }
            }
            // updating current date
            // habit.currentStatus[date.getDay()].date= newDate;
            habit.save();
            user.save();
            req.flash('success', 'habit created...');
            return res.redirect('back');

        }
        req.flash('error',"Internal server ERR***")
        return res.redirect('back');

    } catch (err) {
        req.flash('error', err)
        return res.redirect('back')
    }
}

module.exports.destroy = async function (req, res) {
    try {
        if (req.user) {
            let user = await User.findById(req.user._id);
            let habitIndex = await user.habits.indexOf(req.params.id)
            let habit = await Habit.findById(req.params.id);
            user.habits.splice(habitIndex, 1);
            await habit.deleteOne();
            user.save();
            req.flash('success', 'habit removed succesfully...');
            return res.redirect('back');

        }

        req.flash('error',"Internal server ERR***");
        return res.redirect('back');

    } catch (err) {
        req.flash('error', err);
        return res.redirect('back')
    }
}

module.exports.faovurite = async function (req, res) {
    try {
        if (req.user) {
            let habit = await Habit.findById(req.params.id);
            switch (habit.favourite) {
                case true: {
                    habit.favourite = false;
                    habit.save();
                    req.flash('success', "habit removed from favourite ...")
                    break;
                }
                case false: {
                    habit.favourite = true;
                    habit.save();
                    req.flash('success', "habit added to favourite ...")
                    
                }
            }
            return res.redirect('back');
        }

        req.flash('error', "Internal server ERR***")
        return res.redirect('back');

    } catch (err) {
        req.flash('error', err);
        return res.redirect('back')
    }
}

module.exports.status = async function (req, res) {
    try {

        if (req.isAuthenticated()) {
            let day = req.query.day;
            let date = req.query.date;
            let habitId = req.query.habitId;
            let habit = await Habit.findById(habitId);

            switch (habit.currentStatus[day].state) {
                case "true": {
                    habit.currentStatus[day].state = "false";
                    habit.save();
                    // console.log("habit state false..")
                    req.flash('error', 'habit Not Completed!!');
                    return res.redirect('back');
                }
                case "false": {
                    habit.currentStatus[day].state = "undefine";
                    habit.save();
                    req.flash('error', 'habit still in pending!!');
                    return res.redirect('back');
                }
                default: {
                    habit.currentStatus[day].state = "true";
                    habit.save();
                    req.flash('success', 'habit comlpeted..');
                    return res.redirect('back');
                }

            }

        } else {
            req.flash('error',"Internal server ERR***");
            return res.redirect('back');
        }

    } catch (err) {
        req.flash('error', err);
        return res.redirect('back')
    }
}