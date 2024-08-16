import mongoose from 'mongoose'



//Defining Structure
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},  //only one email id
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})
//minimize give to take cartData will not created,as we didnt give any cartdata,now it will create with
//empty data

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel