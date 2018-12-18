var express = require('express');
var cors = require('cors');
// var bodyParser = require('body-parser');
var app = express();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/data/players/img', express.static('img'));
app.use('/data/teams/img', express.static('img'));

app.use(express.static('public'));

var url = 'mongodb://localhost:27017/';


var findPlayer = function(db, playerId, callback) {
   var cursor = db.collection('playerDetails').find({id: playerId} );
   var player;
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        player = doc;
      } else {
         callback(player);
      }
   });
};

var findPlayers = function(db, playerList,  callback) {
   var cursor =db.collection('players').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         playerList.push(doc);
      } else {
         callback();
      }
   });
};

var findTeam = function(db, teamId, callback) {
   var cursor = db.collection('teamDetails').find({id: teamId} );
   var team;
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        team = doc;
      } else {
         callback(team);
      }
   });
};

var findTeams = function(db, teamList,  callback) {
   var cursor = db.collection('teams').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         teamList.push(doc);
      } else {
         callback();
      }
   });
};

var findEvent = function(db, eventId, callback) {
   var cursor = db.collection('eventDetails').find({id: eventId} );
   var ev;
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        ev = doc;
      } else {
         callback(ev);
      }
   });
};

var findEvents = function(db, eventList,  callback) {
   var cursor =db.collection('events').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         eventList.push(doc);
      } else {
         callback();
      }
   });
};


app.get('/players', function (req, res) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db('database');
    assert.equal(null, err);
    var playerList = [];
    findPlayers(db, playerList, function() {
      res.json(playerList);
      client.close();
    });
  });
});

app.get('/player/:playerId', function (req, res) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db('database');
    assert.equal(null, err);
    findPlayer(db, req.param('playerId'),  function(player) {
      console.log(player)
      res.json(player);
      client.close();
    });
  });
});

app.get('/teams', function (req, res) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db('database');
    assert.equal(null, err);
    var teamList = [];
    findTeams(db, teamList, function() {
      res.json(teamList);
      client.close();
    });
  });
});

app.get('/team/:teamId', function (req, res) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db('database');
    assert.equal(null, err);
    findTeam(db, req.param('teamId'),  function(team) {
      console.log(team)
      res.json(team);
      client.close();
    });
  });
});

app.get('/events', function (req, res) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db('database');
    assert.equal(null, err);
    var eventList = [];
    findEvents(db, eventList, function() {
      res.json(eventList);
      client.close();
    });
  });
});

app.get('/event/:eventId', function (req, res) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db('database');
    assert.equal(null, err);
    findEvent(db, req.param('eventId'),  function(ev) {
      console.log(ev)
      res.json(ev);
      client.close();
    });
  });
});

app.post('/calendar', function (req, res){
  MongoClient.connect(url, function(err, client) {
    var db = client.db('database');
    assert.equal(null, err);
    let newEvent ={
      id : req.body.id,
      name : req.body.name,
      date : req.body.date,
      description : req.body.description,
      lieu : req.body.lieu
    };
    db.collection('events').insertOne(newEvent,null, function (error,results){
      if (error) throw error;
    });
    res.end(ok);
});
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
