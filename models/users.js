const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
   email : {
    type : String,
    require : true
   },
   password : {
    type : String,
    required : true,
    minlength : [6, "Password must be a 6 length character"]
   }
})

const userModel = mongoose.model("blog",userSchema);


module.exports = userModel;