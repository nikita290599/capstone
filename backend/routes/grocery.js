const express = require("express");
const router = express.Router();
const groceryModel = require('../models/grocery');
/**
 * To add grocery Items 
 */
router.post('/add', function(req,res){
    const groceryItem =  new groceryModel(req.body);
    groceryItem.save(function(err){
        if(err){
            console.log("error occured");
            res.send(err);
        }
        else{
            res.send("DATA ADDED SUCCESSFULLY");
        }
    })

});
/**
 * To get grocery item list
 */

router.get('/get',function(req,res){
    groceryModel.find({},{_id:0,__v:0},function(err,data){
        if(err){
            res.send("ERROR!",err);
        }
        else{
            res.send({data});
        }
    })
})

/**
 * To update Grocery Items list
 */


module.exports = router;