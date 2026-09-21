import type { Request,Response } from "express"
import users from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import axios from 'axios'

export const signUp = async(req:Request,res: Response)=>{
  try{
    const user = await users.create(req.body);
    const userpassword = await  bcrypt.hash(user.password,10)
    user.password = userpassword
    user.save()
    res.status(200).json({
      password: userpassword,
      success: true,
      data: user
    })
  }catch(error){
    res.status(500).json({
      success: false,
      message: error
    })
  }
}

export const signIn = async(req:Request, res: Response)=>{
  try{
  const { email, password } = req.body;
  if(!email && password){
    res.status(505).json({
      messgae: "please enter you email and password"
    })
  }
  const user = await users.findOne({email});
  if(!user){ 
    res.status(404).json({
      message: "could not find the user, please try again"
    })
  }
  const payload = {
    userId: user?._id.toString(),
    email : user?.email
  }
  const isValid = bcrypt.compare(password, user?.password!)
      if (!isValid) {
      return res.status(401).json({
        error: "invalid credentials",
      });
    }
    const secret = process.env.JWT;
    if(!secret){
      return res.send("secret is not given")
     }
    const token = jwt.sign(payload,secret, {expiresIn: "7d"}) 
    return res.status(200).json({
      user: payload,
      token,
      message:"login succefull"
    });
  }catch(error){
    res.status(500).json({
      message:" login failed"
    })
  }
}