var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
    Name:{type:String},
    Number:{type:String},
    Email:{type:String},
    uid:{type:String},
    upass:{type:String}
},
{
    collection:"User"
})
module.exports = mongoose.model("User",User);