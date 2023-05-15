

module.exports.create = function(req, res){
    console.log(req.body);
    return res.redirect('back');
}