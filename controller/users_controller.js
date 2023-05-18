const User = require('../models/user');

module.exports.sign_in = function (req, res) {
    return res.render('sign_in');
}

module.exports.sign_up = function (req, res) {
    return res.render('sign-up');
}

module.exports.create = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user || user.password != req.body.password) {
            if (req.body.password == req.body.confirm_password) {

                await User.create(req.body)

                return res.redirect("/users/sign-in");
            } else {
                return res.redirect("back");
            }
        }

        console.log("user already exist!");
        return res.redirect('/');
    } catch (err) {
        console.log("err in creating user: ", err);
        return res.redirect("back");
    }
}

module.exports.createSession = function (req, res) {
    console.log(req.body)
    return res.redirect('/');
}

module.exports.destroySession = function (req, res, next) {

    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        console.log('success', 'You have logged out !');

        return res.redirect("/");
    });
}


module.exports.password_reset = function(req, res){
    return res.render("password_reset");
}

module.exports.forgotPass =async function(req, res){
    try{
        let user=  await User.findOne({email: req.body.email});

        if(user.name == req.body.name){
            user.password = req.body.password;
            user.save();

            console.log("password changed successfully..");
            return res.redirect('/users/sign-in');
        }else{
            console.log("user not found..");
            return res.redirect("back");
        }

    }catch(err){
        console.log("err in finding user user: ", err);
        return res.redirect("back");
    }
}