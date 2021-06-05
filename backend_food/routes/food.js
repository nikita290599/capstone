const express = require("express");
const router = express.Router();
const foodModel = require('../models/food');
/**
 * To add grocery Items 
 */
router.post('/add', function (req, res) {
    const cartItem = new foodModel(req.body);
    cartItem.save(function (err) {
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
router.get('/get', function (req, res) {
    foodModel.find({}, function (err,data) {
        if (err) {
            console.log("error occured");
            res.statusCode(400).send({
                message: err,
            });
        }
        else {
           

            res.send({result:data});
        }
    })

});

router.delete('/delete', function (req, res) {
    const item_id = req.body._id;
    foodModel.remove(
        { "_id": item_id },
        function (err) {
            if (err) {
                res.statusCode(400).send({
                    message: err,
                });
            }
            else {
                res.send({ "result": "successfully removed" });
            }
        }
    )
});

router.delete('/deleteAll', function (req, res) {
    foodModel.remove({}, function (err) {
        if (err) {
            res.statusCode(400).send({
                message: err,
            });
        }
        else {
            res.send({ "result": "successfully removed" });
        }

    })
})

module.exports=router;