// server/index.js

const path = require('path');
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const API_PORT = process.env.PORT || 3001;


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const username = encodeURIComponent("yashwanthkumarms11");
const password = encodeURIComponent("1TG4wd26QXsdPLu1"); // pswrd 1TG4wd26QXsdPLu1

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build'))); - for deployment on render
app.use(express.static(path.resolve(__dirname, '../client')));


//MongoDB set up
console.log(username , password);
const url = `mongodb+srv://${username}:${password}@dogbreedcluster.zyybtvl.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(url, { useUnifiedTopology: true });
let collection = null; // initially null 


//connect to database
client.connect()
    .then(
        connection => {
            //if collection is not present it is automatically created 
            collection = client.db().collection("Breeds"); //comment this when createCollection() is uncommented
            console.log("Server: Connected to Database");
        }
    )
    .catch(err => {
        console.log(`Error in connecting to Database ${url.replace(/:([^:@]{1,})@/, ':****@')}`, err);
    })
    .then(() => {
        app.listen(API_PORT);
        console.log("Server Started in port:" + API_PORT);
    })
    .catch(err => console.log(`Could not start server`, err))

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
