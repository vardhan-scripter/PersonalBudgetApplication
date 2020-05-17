const express = require("express");
const passport = require("passport");
const router = express.Router();
const Item = require("../models/Item");

//@type  POST
//@route  /addItem
//@desc Adding of new item
//@access PRIVATE

router.post("/addItem",passport.authenticate("jwt", {session: false}),(req,res) => {
    // console.log(req.body);
    const newItem = new Item({
        id: Date.now().toString(),
        name: req.body.name,
        description: req.body.description,
        email: req.user.email,
        cost: req.body.cost,
        done: false,
    })
    newItem.save().then(item => {
        res.redirect("../../")
    }).catch(err => {
        res.json({success: false, message: "Internal server error"})
    })
})

//@type  POST
//@route  /addDocument
//@desc Adding of new arraay of items
//@access PRIVATE

router.post("/addDocument",passport.authenticate("jwt", {session: false}),(req,res) => {
    var items = req.body;
    items.forEach(item => {
        item.email = req.user.email;
    });
    console.log(items)
    Item.insertMany(items)
        .then(success => {
            if(!success) {
                res.json({success: false, message: "Error in inserting document"})
            }else{
                res.json({success: true})
            }
        })
        .catch(err => {
            res.json({success: false, message: "Internal server error"})
        })
})

//@type POST
//@route /completeItem
//@desc Update of particular item complete status
//@access PRIVATE

router.post("/completeItem",passport.authenticate("jwt", {session: false}), (req,res) => {
    Item.findOne({id: req.body.id}).then(item => {
        if(!item){
            res.json({success: false, message: "No item found"})
        }
        item.done = true;
        item.save().then(success => {
            res.redirect("../../")
        }).catch(err => console.log(err));
    }).catch(err => {
        res.json({success: false, message: "Internal server error"})
    })
})

//@type DELETE
//@route /deleteItem
//@desc delete a particular item
//@access PRIVATE

router.delete("/deleteItem",passport.authenticate("jwt", {session: false}), (req,res) => {
    Item
    .findOneAndDelete({id: req.body.id})
    .then(success => {
        if(!success){
            res.json({success: false, message: "no such item found"});
        }
        Item.find().sort({id: -1}).then(items => {
            res.json({success: false,items: items});
        }).catch(err => {
            res.json({success: false, message: "Internal server error"})
        })
    })
    .catch(err => {
        res.json({success: false, message: "Internal server error"})
    })
})

module.exports = router;