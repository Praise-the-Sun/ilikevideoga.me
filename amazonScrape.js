var mysql = require('mysql');
var util = require('util');
var events = require('events');
var eventEmitter = new events.EventEmitter();
OperationHelper = require('apac').OperationHelper;
//OperationHelper = require('../lib/apac').OperationHelper;
//Make AWS Identity
var opHelper = new OperationHelper({
    awsId: 'INSERT AWS ID HERE',
    awsSecret: 'INSERT AWS SECRET KEY HERE',
    assocId: 'INSERT ASSOC. ID HERE'
});
//make DB connection
var dbConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'letmein',
    database:'SteamGames'
});
//execute Item Search
opHelper.execute('ItemSearch', {
  'SearchIndex': 'VideoGames',
  'Keywords': 'Digital Downloads',
  'ResponseGroup': 'ItemAttributes'
}, function(err, results) {
	//console.log(results);
	var itemList = results.ItemSearchResponse.Items;
	var numItems = itemList[0].TotalResults[0];
	var numPages = itemList[0].TotalPages[0];
	//traverse items
	for(var i=0;i<10;i++){
	    //get current item
	    var item = itemList[0].Item[i].ItemAttributes[0];
	    //get ASIN
	    var asin = itemList[0].Item[i].ASIN[0];
	    //get Title
	    var title = item.Title[0];
	    //get price
	    var price = item.ListPrice[0].FormattedPrice;
	    //get genre
	    var genre = item.Genre[0];
	    var sql = "INSERT IGNORE INTO AmazonGames SET ?";
	    dbConnection.query(sql, { ASIN:asin, Name:title, Price:price, Genre:genre}, function(err,result){
	    //dbConnection.query(sql, function(err){
		if(err){
		    console.log(err);
		}else{
		    //console.log("Successful Query");
		}
	    });
	}
	dbConnection.end();
});
