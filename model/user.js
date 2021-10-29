const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5
  },
  country : String,
  state : String,
  district : String,
  city : String,
  availability : String,
  bloodgroup:String
},{timestamps: true}
)
module.exports = mongoose.model('User',userSchema)