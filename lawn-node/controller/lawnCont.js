const lawn = require('../model/lawn');


const jwt = require('jsonwebtoken');
var objectId = require('mongoose').Types.ObjectId;
module.exports.addLawn = function (req, res, next) {

    jwt.verify(req.token, 'secret', (err, authdata) => {
        if (err) {
            res.json({ "status": 403, msg: { str1: 'Authentication Failed', str2: '' } });
        }
        else {
            console.log(authdata, "authdata");
            req.body.userId = authdata.UserId;
            var newlawn = new lawn(req.body);

            newlawn.save((err, data) => {
                if (err) {
                    console.log(err);
                    res.json({ "status": 404, msg: { str1: 'Registration failed.', str2: '' } });
                }
                else {
                    console.log("success");
                    res.json({
                        "status": 200, msg: {
                            str1: 'Successfully Registered',
                            str2: ''
                        }
                    });

                }
            })
        }
    });
};


module.exports.listup = function (req, res,next) {
    jwt.verify(req.token, 'secret', (err, authdata) => {
        if (err) {
            res.json({ "status": 403, msg: { str1: 'Authentication Failed', str2: '' } });
        }
        else {
            console.log(authdata);
            lawn.aggregate([
                {
                    $match: { "userId": objectId(authdata.UserId) }
                },
                {
                    $lookup: {
                        from: 'nbusers',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                }
            ]).exec((err, data) => {
                if (err) {
                    console.log("err", err);
                    res.send(err);
                }
                else {
                    console.log(data);
                    res.json({ data: data });
                }
            });

        }
    });
}

module.exports.deleteLawn = function (req, res) {
    jwt.verify(req.token, 'secret', (err, authdata) => {
        if (err) {
            res.json({ "status": 403, msg: { str1: 'Authentication Failed', str2: '' } });
        }
        else {
            console.log(authdata, "auth");
            console.log(typeof (req.params._id));
            lawn.findOneAndDelete({ "_id": req.params._id }).then((err, status) => {
                console.log(err, "status", status);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return lawn.find({ "userId": authdata.UserId })
            })
                .then((docs) => {
                    // console.log(docs,"sad");
                    res.json({ deleted: true, data: docs });
                })
                .catch((err) => {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ msg: err });
                })
        }
    });
}




