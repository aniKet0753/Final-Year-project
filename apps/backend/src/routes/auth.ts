import type { Request,Response } from "express"
import users from "../models/user.model.js";
import bcrypt from "bcrypt"

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