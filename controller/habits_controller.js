const Habit = require('../models/habits');
const User = require('../models/user');


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
            for(i=0; i<7; i++ ){
                let dd =date.getDate();
                let mm= date.getMonth()+1;
                let yyy =date.getFullYear();
                if(i == date.getDay()){
                    let newDate = dd +'/'+ mm +'/'+ yyy ;
                    habit.currentStatus.push({ date: newDate, state: "undefine" });
                }else{
                    dd+= (i- date.getDay());
                    let newDate = dd +'/'+ mm +'/'+ yyy ;
                    habit.currentStatus.push({ date: newDate, state: "undefine" });
                }
            }
            // updating current date
            // habit.currentStatus[date.getDay()].date= newDate;
            habit.save();
            user.save();
            console.log("habit created....");
            return res.redirect('back');

        }
        console.log("Internal server ERR***")
        return res.redirect('back');

    } catch (err) {
        console.log("err in create habit", err)
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
            console.log("habit removed succesfully...");
            return res.redirect('back');

        }

        console.log("Internal server ERR***")
        return res.redirect('back');

    } catch (err) {
        console.log("err in removing habit", err)
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
                    console.log("habit added to favourite ...");
                    return res.redirect('back');
                }
                case false: {
                    habit.favourite = true;
                    habit.save();
                    console.log("habit removed from favourite ...");
                    return res.redirect('back');
                }
            }
        }

        console.log("Internal server ERR***")
        return res.redirect('back');

    } catch (err) {
        console.log("err in favourite habit", err)
        return res.redirect('back')
    }
}

module.exports.status = async function (req, res) {
    try {
        console.log("day in number: ",req.query.day);
        console.log("habitId: ",req.query.habitId);
        console.log("date :",req.query.date)
        if (req.isAuthenticated()) {
            let day = req.query.day;
            let date = req.query.date;
            let habitId = req.query.habitId;
            let habit = await Habit.findById(habitId);

            // console.log(habit.currentStatus.length)
            // if (habit.currentStatus) {

                // for (i of habit.currentStatus) {
                    // if (habit[day].date == date) {
                        switch (habit.currentStatus[day].state) {
                            case "true": {
                                habit.currentStatus[day].state = "false";
                                habit.save();
                                console.log("habit state false..")
                                return res.redirect('back');
                            }
                            case "false": {
                                habit.currentStatus[day].state = "undefine";
                                habit.save();
                                console.log("habit state undefine..")
                                return res.redirect('back');
                            }
                            default: {
                                habit.currentStatus[day].state = "true";
                                habit.save();
                                console.log("habit state true..")
                                return res.redirect('back');
                            }

                        }

                    // }
                // }
            // } else {

            //     habit.currentStatus.push({ date: date, state: 'true' })
            //     habit.save()
            //     console.log("habit state true..");
            //     return res.redirect('back');
            // }

            // return res.redirect("back");

        }else{
            console.log("Internal server ERR***")
        return res.redirect('back');
        }

        

    } catch (err) {
        console.log("err in status habit", err)
        return res.redirect('back')
    }
}