const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//import in project
const genToken = require('../../helpers/genToken');

async function userSininController(req, res){
  try {
    const {email, password} = req.body;
    
    if(!email || !password){
      throw new Error("Please enter email and password");
    }

    const user = await userModel.findOne({email});
    if(!user){
      throw new Error("User not found");
    }

    //hash pass and check password
    const checkPass = await bcrypt.compare(password, user.password);

    if(!checkPass){
      throw new Error("Sign in failed, re-check email and password");
    }

    //genToke
    const {token, tokenOption} = await genToken(user);

    res.cookie("token", token, tokenOption).status(200).json({  //OK
      message: "Login successfully",
      data: token,
      success: true,
      error: false
    })

  } catch (error) {
    res.json({ 
      message: error.message || error,
      success: false,
      error: true
    })
  }
}

module.exports = userSininController;