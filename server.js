/*
 * Node.js backend for CS TAs, group 3, calendar web app, final project in CS 290
 * Authors: Tristan Hilbert, Tyler Titsworth, Ryan Kennedy, Alexander Guyer
 * Created on 11/7/2018 @ 1:46 am
 *
 */

const express = require('express');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const app = express();
const c = require('calendar');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'webdevfinal';
const client = new MongoClient(url);
var db;
var port = process.env.PORT || 80;

// /*
//  *
//  * Connect to Mongo DB
//  *
//  */

// client.connect(function (err, client){
// 	assert.equal(null, err);
// 	console.log('Driver connected to Mongo DB');

// 	db = client.db(dbName);
// });

// /*getEvents, takes in query parameters (http://host/events?start_date=<START_DATE>&end_date=<END_DATE>
//  * start_date and end_date mark the bounds of the database access. This way, if large calendars are stored, it is
//  * possible to request the events for only particular days. Range is inclusive. Returned as JSON object array for ease of
//  * integration.
//  *
//  */

// function getEvents (req, res){
// 	res.json({});//For now, empty JSON object. TODO: implement function to gather objects from MongoDB.
// };

//Set up Tristan's weird Templating
var context = require("./context.json");

const custom_handles = require("./custom_handlebar.js");
custom_handles.attach_custom_handles(handlebars);

//Set up express
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static('public'));


//set up blocks
var context = require("./context.json");
context["event"] = "*Event*";

app.get("/:month/:week/:year", function(req, res, next){
    var event = require("./event.json");
    cal = new c.Calendar(1);
    var week = parseInt(req.params.week)-1;
    var year = parseInt(req.params.year);
    var month = parseInt(req.params.month);
    cal = cal.monthDays(year, month);
    if(cal.length > week){
        cal = cal[week];
        for(var j = 0; j < event.length; j++){
            if(event[j]["year"] == year && event[j]["month"] == month){
                for(var i = 0; i < cal.length; i++){
                    if(cal[i] == event[j]["day"]){
                        context["times"][event[j]["time"]][context["day"][i]] = true;
                    }
                }
            }
        }
        res.status(200).render('calendar_app', {context});
    }
    else{
        console.log("bad");
        next();
    }
    
});

//serve webpage, will need updating
app.get("/", function(req, res, next){
    res.status(200).render('calendar_app', {context});
});
app.get("*", function(req, res, next){
    res.status(404).render('404', {});
});

app.listen(port, function(){
	console.log("Server listening on port", port);	
});
