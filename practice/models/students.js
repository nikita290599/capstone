const mongoose= require('mongoose');
const schema = mongoose.Schema;
const studentSchema = new mongoose.Schema({
    studentFirstName:String ,
    collegeName :String,
    location:String
},
{collection:'student'});
module.exports=mongoose.model('student',studentSchema);