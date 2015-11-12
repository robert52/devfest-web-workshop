'use strict';

var express = require('express');
var router = express.Router();
var clientCtrl = require('../controllers/client');
//var auth = require('../middlewares/authentication');

// TODO: authenticate user

router.post('/clients', clientCtrl.create);
router.get('/clients', clientCtrl.getAll);
router.get('/clients/:clientId', clientCtrl.findById);
router.put('/clients/:clientId', clientCtrl.update);
router.delete('/clients/:clientId', clientCtrl.remove);

module.exports = router;
