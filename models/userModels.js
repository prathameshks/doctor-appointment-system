const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Name is Required"]
    },
    email:{
        type:String,
        required: [true,"Email is Required"]
    },
    password:{
        type:String,
        required: [true,"Password is Required"]
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isDoctor:{
        type:Boolean,
        default:false,
    },
    notification:{
        type:Array,
        default:[]
    },
    seen_notification:{
        type:Array,
        default:[]
    },
});

const userModel = mongoose.model("user",userSchema,"user");

module.exports = userModel;