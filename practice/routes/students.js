const express = require('express');
const router = express.Router();
const studentsModal= require('../models/students');


router.post('/addStudent',function(req,res){
   
    const studentsData = new studentsModal(req.body);
    studentsData.save(function(err){
        if(err){
            console.log(error);
        res.send("error occured"+error);
        }
        else{
            res.send("Data added succesfully");
        }
    })

})

router.get('/get', function(req, res, next) {

    console.log("response in search",req.query.name);
  studentsModal.find({},{_id:0,__v:0},function(err,data){
    if(err){
        console.log("error in fetch",err);
        res.send("error occured");
    }
    else{
        // console.log("data from students collection",data);
        res.send(data);
    }

});
});

router.put("/updateStudent",function(req,res){
    studentsModal.findOneAndUpdate(
         {studentFirstName:req.body.studentFirstName},//query to find the record
         {$set:{collegeName:req.body.collegeName}},//updation of record
        {
            new:true,
            runValidators:true
        },
        function(err){
            if(err){
                res.send("error occured");
            }
            else{
                res.send("succesfully updated data");
            }
        });
    
})

router.delete('/delete',function(req,res){
    studentsModal.findOneAndRemove({studentFirstName:req.body.studentFirstName},
        function(err){
            if(err){

                res.send("Error occured");
                console.error(err);
            }
            else{
                res.send('data deleted succesfully')
            }

        })
})

module.exports = router;
