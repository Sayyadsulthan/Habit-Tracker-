const express = require('express');
const router = express.Router()

const habitsController = require('../controller/habits_controller');
router.post('/create', habitsController.create);
router.get('/destroy/:id', habitsController.destroy);


module.exports =router;