const express = require('express');
require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
var expressLayouts = require('express-ejs-layouts');
const app = express();
var ObjectID = require("mongodb").ObjectID;


const uri = process.env.connection;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const axios = require('axios');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");



client.connect(err => {
    const selcCollection = client.db("test").collection("SELC");
    const selcHistory = client.db("test").collection("SELCHistory");


    //Render Homepage
    app.get('/', (req, res) => {


        res.render("home", {
          title: "SELC"
        });
    })

    /*
    //Save history into system 
    app.post('/saveHistory', (req, res) => {



        let history = {
            name: "Billy",
            game: "TFT",
            points: 50,
            date: new Date(),
        }

        console.log(240, history);
        element3History.insertOne(history, (err, item) => {
            if (err) {
                console.log(131, err);
                res.send({ "131 Error is ": + err });
            }
            else {
                console.log("Saved history successfully");
            }
        });
        console.log("History saved successfully");
        res.redirect("/");

    });
    */






});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Sever started on port " + PORT);
});