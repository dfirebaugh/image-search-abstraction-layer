require('dotenv').config();
var mongo = require('mongodb').MongoClient;
var dataB = process.env.URI;
var express = require('express');
var request = require('request');
var app = express();
var url = `https://www.googleapis.com/customsearch/v1?key=${process.env.KEY}&searchType=image&fields=items(htmlTitle,link,snippet,image/contextLink,image/thumbnailLink)&prettyPrint=false&cx=${process.env.SEARCHID}&q=`
var port = process.env.PORT || 8800


mongo.connect(dataB, function(err,db){
    if (err) throw err

    db.createCollection("latest", {
        capped: true,
        size: 5242880,
        max: 1000
        });

    var collection = db.collection('latest')
    searchImg(collection);
    latest(collection);
})

var searchImg = function(collection){
    app.get('/imagesearch/:query', function (req, res) {
      var startIndex = 1;
      var searchTerm = req.params.query
      var date = new Date();

      if(req.query.offset){
        startIndex = req.query.offset * 10
        console.log(startIndex)
        // console.log(`${url}${searchTerm}&start=${startIndex}`)
      }
      request(`${url}${searchTerm}&start=${startIndex}`,function(error,response,body){
        var data = JSON.parse(body)
        if(error){
          console.log('error',error); //print Error
          res.send(error)
        }
        if(response.statusCode === 200){
          res.send(data)
        }
      })

      collection.insert(
        {
          "term": searchTerm,
          "when": date
        })

    })
}

var latest = function(collection){
    app.get('/latest', function (req, res) {

      collection.find().toArray(function(err, items){
        if(err)throw err
        
        res.send(items)
      })
    })
}



app.listen(port, function () {
  console.log('listening on port: '+ port)
})
