// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 8000 ;

// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const server = app.listen(port , callb)
function callb () {
    console.log(`server running in http://localhost:${port}`)
}
// return data to use it in server side
app.get('/getTempData' , (req,res)=>{
    res.send(projectData)
})
// store data in projectData
app.post('/postTempData',(req,res)=>{
    const newEntry = req.body;
    projectData={...newEntry};
    res.end();
})