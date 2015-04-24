var MongoClient = require('mongodb').MongoClient;
var express    = require('express');
var random = require("random-js")(); // uses the nativeMath engine
var pg = require('pg');

var router = express.Router();

router.post("/insertdata",function(req,res){

MongoClient.connect("mongodb://localhost:27017/dataDb", function(err, db) {
  if(err) { return console.dir(err); }

  db.createCollection('consumo', function(err, collection) {});
  var collection = db.collection('consumo');

  for (var i = 0; i < 10; i++) {
  	var doc = {bebida: "cerveja"+i, consumo: random.integer(1, 100)};
  	collection.insert(doc, {w:1}, function(err, result) {});

  }	
  db.close();
  res.status(200);

});

});

router.get("/all", function(req,res){

	MongoClient.connect("mongodb://localhost:27017/dataDb", function(err, db) {

		var collection = db.collection('consumo');
		collection.find().toArray(function(err, items) {
			if(err) {return res.json({message: "Erro"})};
			db.close();
			return res.json(items)
		});

	});

});

router.post("/insertdatapg",function(req,res){

	var dbUrl = "postgres://marcelo:1234@localhost/dataDb";
	var client = new pg.Client(dbUrl);

	client.connect(function(err) {
	  if(err) {
	    return console.error('could not connect to postgres', err);
	  }

	  for (var i = 0; i <10; i++) {
	  	client.query('INSERT into consumo (bebida, consumo) VALUES($1, $2)', 
	            ['cerveja'+i, random.integer(0,100)], 
	            function(err, result) {
	            	console.log("insert" + i);
	                if (err) {
	                	console.log(err);
	                	res.status(500);
	                }
	                client.end();
	            });        
		}

	  });
});

router.get("/allpg", function(req,res) {

	var dbUrl = "postgres://marcelo:1234@localhost/dataDb";

	var client = new pg.Client(dbUrl);

	client.connect(function(err) {
	  if(err) {
	    return console.error('could not connect to postgres', err);
	  }

	 client.query('SELECT bebida, consumo FROM consumo', 
            function(err, result) {
            	if(err) {return res.json({message: "Erro"})};
            	client.end();
                return res.json(result.rows);
            });        
	});

});

module.exports = router;