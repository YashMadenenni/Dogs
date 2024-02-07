// server/index.js

const path = require('path');
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const API_PORT = process.env.PORT || 3001;
const http_request = require('request-promise');
const bodyParser = require('body-parser');
const crypto = require("crypto");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Increase payload size limit (e.g., 10MB)
app.use(express.json({ limit: '20mb' }));

const username = encodeURIComponent("yashwanthkumarms11");
const password = encodeURIComponent("1TG4wd26QXsdPLu1"); // pswrd 1TG4wd26QXsdPLu1

var { DogsBreedData } = require("./modifiedDogs");
const { ObjectId } = require('mongodb');

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build'))); - for deployment on render
app.use(express.static(path.resolve(__dirname, '../client')));


//MongoDB set up
const url = `mongodb+srv://${username}:${password}@dogbreedcluster.zyybtvl.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let collectionBreeds = null; // initially null 

//Insert some data into the collection
const insertStarterDataBreeds = async function () {
  return collectionBreeds.insertMany(DogsBreedData).then(res => console.log("Data inserted with ID ", res.insertedIds))
    .catch(err => {
      console.log("Could not add data ", err.message);
    })
}

//connect to database
client.connect()
  .then(
    connection => {
      //if collection is not present it is automatically created 
      collectionBreeds = client.db().collection("Breeds");
      console.log("Server: Connected to Database");
    }
  )
  .catch(err => {
    console.log(`Error in connecting to Database ${url.replace(/:([^:@]{1,})@/, ':****@')}`, err);
  })

  //  .then(() => insertStarterDataBreeds()) //insert initial data after connecting
  //  .catch(err => console.log(`Could not insert data`, err))

  .then(() => {
    //  updateDogData(); // Call the function to update dogData

    app.listen(API_PORT);
    console.log("Server Started in port:" + API_PORT);
  })
  .catch(err => console.log(`Could not start server`, err));



// //fetch additional details of dogs
// async function fetchAdditionalDetails(name) {
//   try {
//     const options = {
//       uri: 'https://api.api-ninjas.com/v1/dogs',
//       qs: { name: name },
//       headers: {
//         'X-Api-Key': '51Rzzg1tbx4pNrKXnO3+hQ==pqbnuf5QUC7puLfF'
//       },
//       json: true
//     };

//     const body = await request(options);
//     return body;
//   } catch (error) {
//     console.error('Request failed:', error.message);
//     throw error;
//   }
// }

async function getDogImages(name, breedName) {
  var name = name.toLowerCase().split(" ");
  var dogName = name[0];
  var searchParam = "";
  if (name.length > 1) {
    searchParam = breedName + "/" + dogName;
  } else searchParam = dogName;

  try {
    const options = {
      uri: `https://dog.ceo/api/breed/${searchParam}/images/random`,
      json: true
    };

    const body = await http_request(options);
    console.log(body.message);
    return body.message;

  } catch (error) {
    console.error('Request failed:', error.message);
    throw error;
  }
}

// Add additional details of dogs
const dogData = {};

async function updateDogData() {
  for (const dog of DogsBreedData) {
    // console.log(dog.name);
    try {
      var image_src = await getDogImages(dog.name, dog.breed);
      var friendly = n = crypto.randomInt(1, 5);
      var activeness = n = crypto.randomInt(1, 5);
      var security = n = crypto.randomInt(1, 5);
      // dog.image = image_src;

      const filter = { name: dog.name };
      const update = { $set: { image_src: image_src , friendly:friendly,activeness:activeness, security:security } };

      collectionBreeds.updateOne(filter, update)
        .then(result => {
          if (result.matchedCount > 0) {
            console.log(`Updated image for ${dog._id}`);
          } else {
            console.log(`No matching document found for ${dog.name}`);
          }
        })
        .catch(err => {
          console.log("Error updating document:", err.message);
        });

    } catch (error) {
      // Handle errors or decide what to do if fetching details fails
      console.error('Error fetching details for', dog.name, error.message);
    }
  }

  // Now you can use the updated dogData object as needed
  // console.log(dogData);
}



// Handle GET requests to /api route
app.get("/api", (request, response) => {
  response.json({ message: "Hello from server!" });
});

//Send all Dogs information
app.get("/allDogs", (request, respone) => {
  
  collectionBreeds.find().toArray()
    .then(doc => {
      try {
        if (doc.length > 0) {
          respone.send(doc);
        } else {
          respone.send("No documents");
        }
      } catch (error) {
        console.log(error);
        respone.send("error retrieving documents");
      }
    })
});

// To Fetch dog with ID breeds
app.get("/dog/:id", (request, response) => {
  var id = parseInt(request.params.id);

  collectionBreeds.find({ _id: id }).toArray()
    .then(docs => {
      if (docs.length > 0) {
        response.send(docs);
      } else {
        response.send("No documents");
      }
    })
    .catch(error => {
      console.error('Error retrieving documents:', error);
      response.status(500).send("Error retrieving documents");
    });
});

// Function to generate a custom ID
function generateCustomId() {

  // generate Random id
  var n = 0;
  do {
      n = crypto.randomInt(0, 100000);
  } while (checkId(n));

  return n;
}

// Find if the ID is already exists in DB 
function checkId(randomId) {
 collectionBreeds.find({_id:randomId}).toArray()
 .then(doc =>{ 
   return ((doc.length > 0)? ture : false);
   });
}


//curl -X POST -H "Content-Type: application/json" -d '{"name":"NewDogName","subcategory":false,"breed":null,"image_src":"","details":""}' http://localhost:3001/addDog
//To Add new Dog
app.post("/addDog", (request, respone) => {
  const newDogData = request.body;
  const newDogName = request.body.name;

  collectionBreeds.find({ name:newDogName }).toArray()
    .then(doc => {
      if (doc.length == 0) {
        const customId = generateCustomId();
        // console.log(customId);
        // Create a new dog object with the custom ID
        const newDog = {
          _id: customId,
          ...newDogData
        };

        collectionBreeds.insertOne(newDog)
          .then(result => respone.status(200).json({ message: `Success inserted with ID ${result.insertedId}` }))
          .catch(err => {
            respone.status(500).json({ message: "Error Creating new Dog" });
            console.log(err)
          })

      } else {
        respone.status(500).json({ message: "Document Exists" });
      }
    })
});

//Update an exsisting dog with ID
app.put("/updateDog/:dogId", (request, response) => {
  const dogId = parseInt(request.params.dogId);
  const updateDogData = request.body;
console.log(dogId);
  collectionBreeds.find({_id:dogId}).toArray()
  .then(doc =>{ 
    ((doc.length > 0)? console.log(doc) : console.log("Error"));
    }).catch(err => console.log(err));  

  collectionBreeds.findOneAndUpdate(
    { _id: dogId },
    { $set: updateDogData },
    { returnDocument: 'after' }
  )
    .then(result => {
      if (result) {
        console.log(JSON.stringify(result));
        response.send(result.value);
      } else {
        response.status(404).json({ message: "No matching document found" });
      }
    })
    .catch(error => {
      console.error('Error updating document:', error);
      response.status(500).json({ message: "Error updating document" });
    });
});

// Delete a dog by ID
app.delete("/deleteDog/:id", (request, response) => {
  const dogId = parseInt(request.params.id);

  collectionBreeds.deleteOne({ _id: dogId })
    .then(result => {
      if (result.deletedCount > 0) {
        response.status(200).json({ message: "Dog deleted successfully" });
      } else {
        response.status(500).json({ message: "No matching document found" });
      }
    })
    .catch(error => {
      console.error(error);
      response.status(500).json({ message: "Error deleting document" });
    });
});

// All other GET requests not handled before will return our React app
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client', 'index.html')); //add build for production
});
