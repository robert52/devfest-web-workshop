'use strict';

var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user');
//var auth = require('../middlewares/authentication');

// TODO: authenticate user

router.get('/users', userCtrl.getAll);
router.get('/users/:userId', userCtrl.findById);
router.post('/users', userCtrl.create);

module.exports = router;
