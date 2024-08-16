import express from "express";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer";



const foodRouter = express.Router();


//image storage Engine
const storage =multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
         return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload=multer({storage:storage})


//|||^^ to images store in uploads

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);

//By using this we can get get,post,delete etc...

export default foodRouter;