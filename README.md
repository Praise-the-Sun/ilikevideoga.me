# ilikevideoga.me
CS 480 Project

### About

ilikevideoga.me is a web service designed to find Steam users games that better suit their tastes in videogames over Steam's native suggestion queue.

### Under the Hood:
ilikevideoga.me is powered by the following modules and other goodies
* Web Scraping done with cheerio
* Database powered by a local mysql database. Unfortunately this github does not come with said database and you'll have to populate your own.
* Website templating done with [handlebars.js](http://www.handlebarsjs.com/)
* Various other basic Node utilities

### How does everything work?
Key javascript files described in alphabetical order
* ```buildHTML.js``` - DEPRECATED, everything this does is now included in steamAPIFunctions.js to do templating and queue generation in one move. May be used again when we have to create dynamic divs for different users and IDs
* ```server.js``` - Basic Node HTTP server to deploy our website with.
* ```steamAPIFunctions.js``` - Uses the Steam API to grab a given user's public library with playtimes and generates a list of 30 games from our database that suit them. Also finds 30 Discounted games. These lists are templated and written to our website html.
* ```tagGrabber``` - Technically not fully functional. Opens the store page of every single game in our database and scrapes the user tags for each game and updates the database with each game's tags. Only can do 300 at a time at the moment.
* ```webScrape.js``` - Backbone of our database and web functions. Goes through a search list of all Steam games and scrapes the game's id, Name, Price, Sale Price(if any), and image url and writes them to our local database.

### Notes for Brave Souls trying to fork this
* If you want to get your own database set up using Node, install mysql onto your server and just set up your tables to match the ones in our ```webScrape.js``` file. Or change the names in ```webScrape.js``` to your own table names. Whatever helps you sleep at night.
* If you want to use our ```steamAPIFunctions.js```, go ahead, but change out the Steam Key value at the top to your own API key. 
* I'm planning to come back and fix the ```tagGrabber.js``` script. I wrote it broken in a hurry and populated our tags database 300 entries at a time because Node would run out of memory if we tried to make all the queries at once. -zettaslow
