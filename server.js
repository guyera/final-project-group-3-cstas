/*
 * Node.js backend for CS TAs, group 3, calendar web app, final project in CS 290
 * Authors: Tristan Hilbert, Tyler Titsworth, Ryan Kennedy, Alexander Guyer
 * Created on 11/7/2018 @ 1:46 am
 *
 */

const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'webdevfinal';
const client = new MongoClient(url);
var db;

/*
 *
 * Connect to Mongo DB
 *
 */

client.connect(function (err, client){
	assert.equal(null, err);
	console.log('Driver connected to Mongo DB');

	db = client.db(dbName);
});

/*getEvents, takes in query parameters (http://host/events?start_date=<START_DATE>&end_date=<END_DATE>
 * start_date and end_date mark the bounds of the database access. This way, if large calendars are stored, it is
 * possible to request the events for only particular days. Range is inclusive. Returned as JSON object array for ease of
 * integration.
 *
 */

function getEvents (req, res){
	res.json({});//For now, empty JSON object. TODO: implement function to gather objects from MongoDB.
};

app.listen(80, function(){
	console.log("Server listening on port 80");
	
	//Serve static files in root web app directory
	app.use(express.static('/'));

	app.get('/events', getEvents);
});
