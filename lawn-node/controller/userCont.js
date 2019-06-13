const jwt = require('jsonwebtoken');
const User = require('../model/user');


module.exports.getUser = function (req, res, next) {
  User.find({})
    .then(users => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      // res.json(users);
      res.render('users', { users: users });
    }, (err) => next(err))
    .catch((err) => next(err));
};

module.exports.addUser = (req, res, next) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user == null) {
        User.create(req.body)
          .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, msg: 'Successfull' });
            //res.render('users', {users: users});
          });
      }
      else {
        res.statusCode = 409;
        res.setHeader('Content-Type', 'application/json');
        res.json({ msg: "User " + req.body.firstname + " Exists" });
      }
    }, err => next(err));
};

module.exports.loginUser = (req, res,next) => {
  let searchname = req.body.username;
  let passwordname = req.body.password;
  console.log(req.body);


  User.findOne({ username: searchname, password: passwordname }, (err, obj) => {
    if (obj == null) {
      res.json({ "status": 404, msg: { str1: 'Incorrect Username or Password.', str2: 'User not found.' } });
    }
    else {

      jwt.sign({ UserId: obj._id }, 'secret', { expiresIn: 60 * 60 }, (err, token) => {
        if (err) {
          res.send(err);
        }
        else {
          res.json({
            "status": 200, token: token, msg: {
              str1: 'Successfully LoggedIn',

            }
          });
        }
      });
    }
  });

};




