var Joi = require('joi');

const emailRegex = /[A-Za-z]{3,}[1-9][0-9]@[A-Za-z]{3,}[.]{1}[A-Za-z]{3,}/;



const UserValidate = Joi.object({
    Name : Joi.string().required(),
    Number : Joi.string().length(10).required(),
    Email : Joi.string().email().regex(emailRegex).required(),
    uid : Joi.string().required(),
    upass : Joi.string().required().min(6).message('Password is required!')
})

module.exports = {
    UserValidate
};