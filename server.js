/*
 * Node.js backend for CS TAs, group 3, calendar web app, final project in CS 290
 * Authors: Tristan Hilbert, Tyler Titsworth, Ryan Kennedy, Alexander Guyer
 * Created on 11/7/2018 @ 1:46 am
 *
 */
const times = require('./times.json');
const express = require('express');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const app = express();
const c = require('calendar');

const MongoClient = require('mongodb').MongoClient;

const assert = require('assert');
var mongoHost = process.env.MONGO_HOST || '35.235.123.219';
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER || 'csta';
var mongoPassword = process.env.MONGO_PASSWORD || 'gcp-csta';
var mongoDbName = process.env.MONGO_DB_NAME || 'final';
var mongoUrl = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDbName;
var db;
var port = process.env.PORT || 80;

// /*
//  *
//  * Connect to Mongo DB
//  *
//  */

MongoClient.connect(mongoUrl, function (err, client){
	assert.equal(null, err);
	console.log('Driver connected to Mongo DB');

	db = client.db(mongoDbName);
	app.listen(port, function(){
		console.log("Server listening on port", port);	
	});
});

//Set up Tristan's weird Templating
const custom_handles = require("./custom_handlebar.js");
custom_handles.attach_custom_handles(handlebars);

//Set up express
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static('public'));


//set up blocks
var context = require("./context.json");
context["event"] = "*Event*";

app.get("/event/:month/:week/:year/:time", function(req, res, next){
    //should search for event here
    db.collection('event').find({}).toArray(function(err, eventDocs){
    	var event_pass = {};
	event_pass['event'] = eventDocs;
        res.status(200).render('events', event_pass);
    });
});

function renderCalendar(week, year, month, res, next){
    db.collection('event').find({}).toArray(function(err, event){
        cal = new c.Calendar(1);
   	cal = cal.monthDays(year, month);
   	if(cal.length > week){
		var contextClone = JSON.parse(JSON.stringify(context));
       		cal = cal[week];
      	 	for(var j = 0; j < event.length; j++){
           		if(event[j]["year"] == year && event[j]["month"] == month){
                		for(var i = 0; i < cal.length; i++){
                   			if(cal[i] == event[j]["day"]){
                      			 	contextClone["times"][event[j]["time"]][contextClone["day"][i]] = true;
                    			}
                		}
            		}
        	}
        	res.status(200).render('calendar_app', {'context': contextClone});
    	}
    	else{
        	console.log("bad");
        	next();
    	}
    });
}

app.get("/:month/:week/:year", function(req, res, next){
    var week = parseInt(req.params.week);
    var year = parseInt(req.params.year);
    var month = parseInt(req.params.month);
    renderCalendar(week, year, month, res, next);
});

//serve webpage, will need updating
app.get("/", function(req, res, next){
    //Get current month, week, and year, then render that page
    var now = new Date();
    var date = new Date(now.getFullYear(), now.getMonth(), 1);//Move to first of month
    var week = Math.floor((now.getDate() + (date.getDay() == 0 ? 6 : (date.getDay() - 1)) - 1) / 7);
    renderCalendar(week, date.getFullYear(), date.getMonth(), res, next);
});
app.get("*", function(req, res, next){
    res.status(404).render('404', {});
});

