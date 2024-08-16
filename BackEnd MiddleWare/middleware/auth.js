import jwt from "jsonwebtoken"


// while request we will not send (id) instead we send token in which
// (midddleware converts the token to user's id)

const authMiddleware = async(req,res,next) =>{
    const {token} = req.headers;
    if(!token)
    {
        return res.json({success:false,message:"Not Authorized Login Again."})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

} 
export default authMiddleware;