const express = require("express");

const router = express.Router();
const Item = require("../models/Item");

//@type  POST
//@route  /addItem
//@desc Adding of new item
//@access PRIVATE

router.post("/addItem",(req,res) => {
    // console.log(req.body);
    const newItem = new Item({
        id: Date.now().toString(),
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        done: req.body.done,
    })
    newItem.save().then(item => {
        res.redirect("../../")
    }).catch(err => console.log(err));
})

//@type POST
//@route /completeItem
//@desc Update of particular item complete status
//@access PRIVATE

router.post("/completeItem", (req,res) => {
    Item.findOne({id: req.body.id}).then(item => {
        if(!item){
            res.json({failure: "No item found"})
        }
        item.done = true;
        item.save().then(success => {
            res.redirect("../../")
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
})

//@type DELETE
//@route /deleteItem
//@desc delete a particular item
//@access PRIVATE

router.delete("/deleteItem", (req,res) => {
    Item
    .findOneAndDelete({id: req.body.id})
    .then(success => {
        if(!success){
            res.json({error: "no such item found"});
        }
        Item.find().sort({id: -1}).then(items => {
            res.json(items);
        }).catch(err => console.log(err));
    })
    .catch(err => console.log(err));
})

module.exports = router;