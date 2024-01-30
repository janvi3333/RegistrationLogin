var express = require('express');
var User = require('../model/usermodel');
// const {UserValidate} = require('../validation/uservalidate');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require('cookie-parser')


module.exports = {
    userReg : async(req,res,next)=>{
       try {
        // const Data = await UserValidate.validateAsync(req.body);
         let { Name,Number,Email,uid,upass} = req.body; 
         const UserExist = await User.findOne({Email:Email})
         if(UserExist){
            res.status(400).send("Email already exist");
         }
         const SaltRount = await bcrypt.genSalt(10);
         const hassPas = await bcrypt.hash(upass,SaltRount);
        let result =  await User.create({ Name,Number,Email,uid,upass:hassPas});
         const token =  jwt.sign({
            id:result._id,Email:Email
         },process.env.JWT_SECRET_KEY)
           res.cookie(token);
           return res.status(201).json({success:true,message:"Data Saved Successfully",token,userId:result._id.toString()});
       } catch (error) {
           next(error)
       }
        
    },

    userLog : async(req,res,next)=>{
        try {
            // const data = await UserValidate.validateAsync(req.body);
             let {Email,upass} = req.body;
             const UserExist = await User.findOne({Email});
             if(!UserExist)
             {
                return res.status(400).json({msg:"Invalid credential"});
             }
             const user =  bcrypt.compare(upass,UserExist.upass);
             if(user)
             {
               
                return res.status(201).json({success:true,message:"Login Successfully"});

             }
            return res.status(200).json({success:true,message:"Login Success"})
        } catch (error) {
            next(error)
        }
    }
}