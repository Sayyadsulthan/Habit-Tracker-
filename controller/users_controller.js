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

                req.flash('success',"user created successfully...");
                return res.redirect("/users/sign-in");
            } else {
                req.flash('error',"password don't match!!");
                return res.redirect("back");
            }
        }

        req.flash('error',"user already exist!");
        return res.redirect('/');
    } catch (err) {
        req.flash('error', err);
        return res.redirect("back");
    }
}

module.exports.createSession = function (req, res) {
    req.flash('success', 'successfully logged in');
    return res.redirect('/');
}


// used logout and destroy session
module.exports.destroySession = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        req.flash('success', 'You have logged out !');
        return res.redirect("/users/sign-in");
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

            req.flash('success',"password changed successfully..");
            return res.redirect('/users/sign-in');
        }else{
            req.flash('error',"user not found..");
            return res.redirect("back");
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect("back");
    }
}