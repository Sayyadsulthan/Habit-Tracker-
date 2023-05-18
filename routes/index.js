const express = require('express');
const router = express.Router()
const passport = require('passport');

const homeController = require('../controller/home_controller');
router.get('/',passport.checkAuthentication, homeController.index );

router.use('/users', require('./user'));
router.use('/habit', require('./habit'));

module.exports =router;