
/* Empty JS object to act as endpoint for all routes */
let projectData = {};

/* Express to run server and routes */
const express = require('express');


const app = express();

const bodyParser = require('body-parser')

// we are configuring express to use body-parser 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const cors = require('cors');
app.use(cors());

/* the main project folder*/
app.use(express.static('website'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

// GET route
app.get('/all', sendData);
function sendData (request, response) {
  response.send(projectData);
};

// POST route

app.post('/add', callBack);
function callBack (request,response){
 
    projectData.date = request.body.date;
    projectData.temp = request.body.temp;
    projectData.content = request.body.content;
    response.send(projectData);
    
};