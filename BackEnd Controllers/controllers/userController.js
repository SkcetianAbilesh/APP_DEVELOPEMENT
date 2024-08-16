import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login user
const loginUser=async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user =await userModel.findOne({email});

        if(!user){  //user is there or not ?
            res.json({success:false,message:"User doesn't not exists."})
        }
        //checking password are same after checking email
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid Password"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
     
}

//Creating token 
const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}





//register user
const registerUser=async(req,res)=>{
    const {name,password,email} =req.body;
    try {
        //checking if user exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User Already exists."})
        }
        //valid email and password strong..
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        // password check
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong Password"})
        }
        
        //Create Account(hashing: to encrypt password we add bcrypt)
        const salt = await bcrypt.genSalt(10)// Salt is random add to password if user as 2 different password.
        const hashedPassword = await bcrypt.hash(password,salt)//These lines generate a unique salt
        // using bcrypt ||->>and then hash a given password with that salt to create a secure, hashed password. 
        //This process enhances security by making the hashed password more resistant to attacks.



        //New User
        const newUser =new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token= createToken(user._id);
        //above token create wil given a response below    // TOKEN CREATION
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}