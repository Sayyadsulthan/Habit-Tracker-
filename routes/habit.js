const express = require('express');
const router = express.Router()

const habitsController = require('../controller/habits_controller');
router.post('/create', habitsController.create);
router.get('/destroy/:id', habitsController.destroy);
router.get('/favourite/:id', habitsController.faovurite);
router.get('/status/', habitsController.status);


module.exports =router;