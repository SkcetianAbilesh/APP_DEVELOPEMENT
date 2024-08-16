import userModel from "../models/userModel.js"

// add items to user cart 
const addToCart = async(req,res) =>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;//cartdata in this variable
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1 //start of cart
        }
        else{
            cartData[req.body.itemId] +=1   // then goin of cart
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to Cart"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove items from user cart
const removeFromCart = async(req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId) //id is got from (token to id) from auth.js from middleware
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const getCart = async(req, res) => {
    try {
        const userId = req.body.userId;
        console.log("User ID:", userId);

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        let cartData = userData.cartData;
        res.json({success: true, cartData});
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({success: false, message: "Error"});
    }
};


export {addToCart,removeFromCart,getCart}