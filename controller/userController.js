const User = require('../model/user');
const bycrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();

//Signup Controller
async function signup(req,res,next) {

  const userExist = await User.findOne({name: req.body.name})
  if(userExist){
     res.status(400).json({"error":'User name already Exist'}) 
  }else{
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist){
      res.status(400).json({"error":'Email already Exist'}) 
    }else{
      const phoneExist = await User.findOne({phone: req.body.phone})
      if(phoneExist){
        res.status(400).json({"error":'Phone number already Exist'}) 
      }else{
        var newPassword = req.body.password
        var confirmPassword = req.body.confirmPassword
        if(newPassword == confirmPassword){
          const salt = await bycrypt.genSalt(10);
          hashpassword = await bycrypt.hash(req.body.password, salt)
          const user =  new User({
              name: req.body.name,
              email: req.body.email,
              phone : req.body.phone,
              bloodgroup : req.body.bloodgroup,
              password: hashpassword,
              country : req.body.country,
              state : req.body.state,
              district : req.body.district,
              city : req.body.city,
              availability : req.body.availability
        })
        try{
          const userSignup = await user.save()
          res.send({'message' : 'succesfully registered'})
        }catch(err){
          res.sendStatus(400).send(err) 
        }
        }else{
          res.status(400).json({error:"Password mismatch"})
        }
      }
      
    }
  }
}




//Login Controller
async function login(req,res,next){
  const phoneExist = await User.findOne({phone: req.body.phone})
  
  if(!phoneExist){
    res.status(400).json({error:"Phone Number not Found"})
  }else{
    const checkpassword = await bycrypt.compare(req.body.password, phoneExist.password)
    if(!checkpassword){
      res.status(400).json({error:"Password mismatch"})
    }else{
      const token = jwt.sign({_id: phoneExist.id}, process.env.SECRET)
      res.header('token',token).json({'Token' : token, 'name' : phoneExist.name, 'id': phoneExist.id})
  }
  }
}

const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id,{
      name : req.body.name, 
      bloodgroup : req.body.bloodgroup,
      country : req.body.country,
      state : req.body.state,
      district : req.body.district,
      city : req.body.city,
      availability : req.body.availability
    })
    .then(data => {
      res.send({message : "Updated Successfully!",name : data.name})
    })
    .catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Bag."
      });
    });
  
  }

const getDonor = (req, res) => {
    // console.log(req.body)
    User.find({
        country:req.body.country,
        state:req.body.state,
        district : req.body.district,
        city : req.body.city
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Bag."
        });
    });
}

module.exports = {
    signup,
    login,
    updateUser,
    getDonor
  }
