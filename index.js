const express = require("express");
const bodyparser = require("body-parser");
const route = require('./routes/route.js')

const app = express();
app.use(bodyparser.json());
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://user-open-to-all:hiPassword123@cluster0.xgk0k.mongodb.net/ArunDB-database?authSource=admin&replicaSet=atlas-e7145j-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true", { useNewUrlParser: true })
    .then(() => console.log("mongoDB is running...."))
    .catch(err => console.log(err))

app.use('/', route);
app.listen(process.env.PORT || 3000, function () {
    console.log("Express appp running on port " + (process.env.PORT || 3000))
});

