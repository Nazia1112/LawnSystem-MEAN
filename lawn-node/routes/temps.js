var express = require('express');
var router = express.Router();
var tempCont = require('../controller/tempCont');

router.get('/tempchart',tempCont.getTemp);
router.get('/precipchart', tempCont.getPrecip);

module.exports = router;