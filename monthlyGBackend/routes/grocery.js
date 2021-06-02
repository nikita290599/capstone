const express = require("express");
const router = express.Router();
const groceryModel = require('../models/grocery');
/**
 * To add grocery Items 
 */
router.post('/add', function (req, res) {
    const groceryItem = new groceryModel(req.body);
    groceryItem.save(function (err) {
        if (err) {
            console.log("error occured");
            res.statusCode(400).send({
                message: err,
            });
        }
        else {
            res.send("DATA ADDED SUCCESSFULLY");
        }
    })

});
/**
 * To get grocery item list
 */

router.get('/get', function (req, res) {
    groceryModel.find({}, {  __v: 0 }, function (err, data) {
        if (err) {
            res.send("ERROR! is this MF", err);
        }
        else {
            res.send({ result: data });
        }
    })
})

/**
 * To update Grocery Items list
 */

router.put("/update", function (req, res) {
    groceryModel.findOneAndUpdate(
        {
            '_id': req.body._id
        },
        {
            'isPurchased': true
        },
        function (err) {
            if (err) {
                console.log("error occured");
                res.statusCode(400).send({
                    message: err,
                });

            }
            else{
                res.send("Purchased succesfully");
            }
        });
});
/**
 * To delete Grocery Items list
 */
router.delete('/delete',function(req,res){
    const item_id = req.body._id;
    groceryModel.remove(
        {"_id":item_id},
        function(err){
            if(err){
                res.statusCode(400).send({
                    message: err,
                });
            }
            else{
                res.send({"result":"successfully removed"});
            }
        }
    )

});

module.exports = router;