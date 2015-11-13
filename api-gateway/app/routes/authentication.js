'use strict';

var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/authentication');
//var auth = require('../middlewares/authentication');

// TODO: authenticate user

router.post('/auth', authCtrl.authenticate);

module.exports = router;
