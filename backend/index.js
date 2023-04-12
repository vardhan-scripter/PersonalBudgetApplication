const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const db = require("./setup/config").dbConnetction;
const item = require("./routes/item");
const Item = require("./models/Item");
const auth = require("./routes/auth");
const passport = require("passport");


app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useFindAndModify', false);

mongoose
    .connect(db)
    .then(() => {
        console.log("Database connetcted successfully");
    })
    .catch(err => console.log(err));

//config for jwt strategy
require("./strategies/jsonwtStrategy")(passport);

//@type  GET
//@route  /
//@desc  To list all items
//@access PRIVATE

app.get('/',passport.authenticate("jwt", {session: false}),(req,res) => {
    Item.find().sort({id: -1}).then(items => {
        res.json({success: true,items: items});
    }).catch(err => {
        res.json({success: false, Errormessage: "Internal server error"})
    })
});

app.use('/item',item);
app.use('/auth',auth);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));