var express = require('express');
var router = express.Router();
var passport = require('passport');

const userCont = require('../controller/userCont');


router.get('/', userCont.getUser );

router.post('/register', userCont.addUser);

router.post('/login', userCont.loginUser);



module.exports = router;
