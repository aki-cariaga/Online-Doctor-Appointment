import Users from "../models/Users.js"
import bcrypt from 'bcrypt';
import { createError } from "../utils/error.js"
import jwt from 'jsonwebtoken'

let sshkey = "W16aQUoCDwHm8AAAAadWpqYWx6YW1hbkBERVNLVE9QLUlLNkVITkUB"
export const register = async(req, res, next) =>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try{
        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        const saveUser = await newUser.save();
        res.status(200).json(saveUser)
    }
    catch(err){
        next(err)
    }

}

export const login = async(req, res, next) =>{
    try{
        const isUser = await Users.findOne({email: req.body.email})
        if(!isUser){
            return next(createError(404, "User not Found"))
        } 
        const isPassword =await bcrypt.compareSync(req.body.password, isUser.password)
        if(!isPassword){
            return next(createError(404, "Password Not match"))
        }
        const token = jwt.sign({id:isUser._id, isAdmin: isUser.isAdmin}, sshkey)
        const {password, ...others} = isUser._doc;
        res.cookie('access_token', token, {httpOnly: true}).status(200).json({details: {...others}})
    }
    catch(err){
        next(err)
    }
}