var express = require('express');
var router = express.Router();
var lawnCont = require('../controller/lawnCont');


/* GET users listing. */
router.post('/addlawn',TokenVerfy, lawnCont.addLawn);

router.get('/listup',TokenVerfy,lawnCont.listup);

router.delete('/deleteLawn/:_id',TokenVerfy, lawnCont.deleteLawn);





function TokenVerfy(req,res,next)
{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== undefined)
    {
        
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token=bearerToken;
        console.log("rfegretetvf");
        next();
    }
    else{
        console.log("err");
        res.json({"status":403,msg: {str1:'Authentication Failed', str2: ''}})
    }
}





module.exports = router;