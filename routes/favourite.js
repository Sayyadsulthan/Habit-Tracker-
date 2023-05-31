const express = require('express');
const router = express.Router()
const passport = require('passport');

const favouriteController = require('../controller/favourite_controller');
router.get('/Dashboard', favouriteController.favouriteDashboard );


module.exports =router;