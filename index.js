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
    const selcCollection = client.db("test").collection("selcAttendeeData");
    const selcHistory = client.db("test").collection("SELCHistory");


    //Render Homepage
    app.get('/', (req, res) => {


        
        res.render("home", {
          title: "SELC"
        });
    })

    app.get('/test', (req, res) => {
        selcCollection.find({}).sort().toArray(function (err, result) {

            console.log(42, result);
            res.render("test", {
                title: "School",
                result: result
            });
        });
    });
    /*
       //Submit points into system
    app.post('/increasePoints', (req, res) => {

        const personID = req.params.id;
        const points = parseInt(req.body.points);
        const teamName = req.body.teamName;

        const name = req.body.player;
        const game = req.body.game;


    
        const teamIdentifier = {
            name: teamName
        };


        let teamPoints = {
            $inc: {
                points: points
            }
        }

        let tempDate = new Date().toString();

        let finalDate = tempDate.substring(0, 25);

        let history = {
            name: name,
            game: game,
            points: points,
            team: teamName,
            date: finalDate,
        }


        collection.updateOne(teamIdentifier, teamPoints, (err, item) => {
            if (err) {
                res.send({ "104 Error is ": + err });
            }
            else {

                console.log("Added " + points + " points to " + teamName);

            }
        });
        element3History.insertOne(history, (err, item) => {
            if (err) {
                console.log(131, err);
                res.send({ "131 Error is ": + err });
            }
            else {
                console.log("Saved history successfully");
            }
        });





        res.redirect("/");
    });



    //Save history into system 
    app.post('/saveHistory', (req, res) => {



        let history = {
            name: "Billy",
            game: "TFT",
            points: 50,
            date: new Date(),
        }

        console.log(240, history);
        selcHistory.insertOne(history, (err, item) => {
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