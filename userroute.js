var express = require('express');
var router = express.Router();
var userCon = require('../controller/usercontroller');

router.post('/reg',userCon.userReg);
router.post('/login',userCon.userLog);

module.exports = router;

// const token =  jwt.sign({
//     id:result._id,Email:Email
//  },process.env.JWT_SECRET_KEY)
//    res.cookie(token);