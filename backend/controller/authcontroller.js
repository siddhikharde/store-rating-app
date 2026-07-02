import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const users = [];

export const register = async(req,res)=>{
  const {
    name,
    email,
    password,
    address
  } = req.body;

  const exist = users.find(
    user=>user.email===email
  );

  if(exist){
    return res.status(400).json({
       success:false,
      message:"User already exists"
    });
  }

  const hashPassword =
    await bcrypt.hash(password,10);

  const user = new User(
    name,
    email,
    hashPassword,
    address
  );

  users.push(user);

  res.json({
    success:true,
    message:"Register successful"
  });

};

export const login = async(req,res)=>{
  const {
    email,
    password
  } = req.body;

  const user = users.find(
    user=>user.email===email
  );

  if(!user){
    return res.status(404).json({
        success:false,
      message:"User not found"
    });
  }

  const match =
    await bcrypt.compare(
      password,
      user.password
    );

  if(!match){
    return res.status(401).json({
        success:false,
      message:"Invalid password"
    });
  }

  const token = jwt.sign(
    {
      email:user.email,
      role:user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn:"1h"
    }
  );

  res.json({
    token,
    data:user,
    success:true
  });

};

