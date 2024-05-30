const userModel = require('../../models/userModel');
const bcrypt = require("bcryptjs");

//import in project
const ROLE = require('../../helpers/role');


const imgDefault = "https://firebasestorage.googleapis.com/v0/b/store-mern-app-249c2.appspot.com/o/1716221842924user.webp?alt=media&token=da27ccbd-266d-438f-a6e5-3e9eb62911f6";

async function userSignupController(req, res){
  try {
    const {email, password, name, profilePic} = req.body; //have from form signup

    //looking for user exist?
    const user = await userModel.findOne({email});

    if(user){
      throw new Error("Already user exists");
    }

    if(!email){
      throw new Error("Please enter a vaild email");
    }
    if(!password){
      throw new Error("Please enter a vaild password");
    }
    if(!name){
      throw new Error("Please enter a vaild name");
    }

    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if(!hashPassword){
      throw new Error("Something went wrong");
    }

    const payload = {
      ...req.body,
      role: ROLE.GENERAL,
      password: hashPassword,
      profilePic: profilePic ? profilePic : imgDefault
    }

    const userDate = new userModel(payload);
    const saveUser = await userDate.save();

    //send res
    res.status(201).json({ //Create
      data: saveUser,
      success: true,
      error: false,
      message: "User created account successfully"
    })

  } catch (error) {
    res.json({
      success: false,
      error: true,
      message: error.message || error
    })
  }
}

module.exports = userSignupController;