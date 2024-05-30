const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//import in project
const genToken = require("../../helpers/genToken");
const ROLE = require('../../helpers/role');




async function userSignInGoogleController(req, res){
  const {name, email, photoURL} = req.body;
  try {
    const user = await userModel.findOne({email});

    if(user){
      //signin
      const {token, optionToken} = await genToken(user);
      res.cookie("token", token, optionToken).status(200).json({
        message: "Login with google successfully",
        data: token,
        success: true,
        error: false
      })

    }else{
      //signun
      const genergatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashPassword = bcrypt.hashSync(genergatedPassword, 10);

      const newUser = new userModel({
        name,
        email,
        password: hashPassword,
        profilePic: photoURL,
        role: ROLE.GENERAL
      })

      const saveUser = await newUser.save();
      const {token, optionToken} = await genToken(saveUser);
      res.cookie("token", token, optionToken).status(201).json({
        message: "Sign up and Sign in with google successfully",
        data: token,
        success: true,
        error: false
      })
    }

  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

module.exports = userSignInGoogleController;