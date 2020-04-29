const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const db = require("./setup/config").dbConnetction;
const item = require("./routes/item");
const Item = require("./models/Item");


app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

mongoose
    .connect(db)
    .then(() => {
        console.log("Database connetcted successfully");
    })
    .catch(err => console.log(err));

//@type  GET
//@route  /
//@desc  To list all items
//@access PRIVATE

app.get('/',(req,res) => {
    Item.find().sort({id: -1}).then(items => {
        res.json(items);
    }).catch(err => console.log(err));
});

app.use('/item',item);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));