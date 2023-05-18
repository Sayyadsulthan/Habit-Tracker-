const express = require('express');
const router = express.Router();

const userController = require('../controller/users_controller');
const passport = require('passport');

router.get('/sign-up', userController.sign_up );
router.get('/sign-in', userController.sign_in );

router.post('/create', userController.create );
router.post('/forgotPass', userController.forgotPass );
router.get('/password_reset', userController.password_reset);
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), userController.createSession);
router.get('/sign-out', userController.destroySession )

module.exports =router;