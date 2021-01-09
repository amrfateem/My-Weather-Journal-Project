// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express()

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 7423; //it's a code from a game so that i can remember it better
const server = app.listen(port, () => console.log(`Server is up on ${port}`))

//Simple GET route with name all to send the collected data
app.get('/all', function (req, res) {
    res.send(projectData);
});

//POST route to append data to to ProjectData object
app.post('/append', collected);

function collected(req, res) {
    //get all then distrubite them
    let data = req.body;
    projectData['temp'] = data.temp;
    projectData['content'] = data.content;
    projectData['date'] = data.date;
};