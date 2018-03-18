var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000;

//this is the route for the html and api

//This static route helps to display the image
app.use(express.static('app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(bodyParser.json());
app.use(bodyParser.text());

require('./app/routing/htmlRoutes')(app);
require('./app/routing/apiRoutes')(app);


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});