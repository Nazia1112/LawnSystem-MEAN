
const Temp = require('../model/temp');
const Precip = require('../model/precip');


module.exports.getTemp = function (req, res,next) {
    Temp.find({}).exec((err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(data);
        }
    })
}

module.exports.getPrecip = function (req, res,next) {
    Precip.find({}).exec((err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(data);
        }
    })
}

