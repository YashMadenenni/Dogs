# 🐶 Dogs Web API

### [Live Demo](https://dogs-sfo8.onrender.com/)

## Table of Content:
1. [About the Project](#about-the-project)
2. [Screenshots](#screenshots)
3. [Technologies Used](#technologies-used)
4. [Setup / Installation](#setup--installation)
5. [Approach](#approach)
6. [Status](#status)
7. [Credits](#credits)

## About the Project:
This project is a solution for a freelance web development test where the goal is to create a web interface for viewing, creating, updating, and deleting dog entries from a list provided in a JSON file (`dogs.json`). The project aims to meet all the requirements provided by the client.

#### Link
`https://dogs-sfo8.onrender.com/`

## Screenshots:

### Home Page
![homepage](https://github.com/YashMadenenni/Dogs/blob/main/home-page.png)

### Search Page
![searchpage](https://github.com/YashMadenenni/Dogs/blob/main/search-page.png)

### Submit Page
![submitpage](https://github.com/YashMadenenni/Dogs/blob/main/submit-page.png)


## Technologies Used:
- ⚛️ React
- 🌀 Tailwind CSS
- 🟩 Node.js
- 🍃 MongoDB
- 🚀 Render

## Setup / Installation:
To run the project locally, follow these steps:
1. Clone the repository: 
```
git clone https://github.com/YashMadenenni/Dogs.git
```
2. Navigate to the project directory: ```cd Dogs```
3. Install dependencies:

   - For frontend: `cd client && npm install`
     
   - For backend: `cd server && npm install`
     
4. Build the frontend: `npm run build`
5. Start the frontend server: `cd client && npm start`
6. Start the backend server: `cd server && npm start`
7. Open your browser and visit: `http://localhost:3000`

**Note**
The server's package.json is currently located in the root directory for simplicity during deployment, where it serves as the complete file. However, for improved file organization, it can be relocated to the ./server directory.

#### Error Handling
**Error Handling:** If you encounter any errors related to serving static files in the backend, make sure to update the server/index.js file. Change the following line:
```javascript
app.use(express.static(path.join(__dirname, '../client')));
```
to
```
app.use(express.static(path.resolve(__dirname, '../client/build')));
```

**Error Handling:**  If you encounter any errors related to:
```javascript
Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
 - options.allowedHosts[0] should be a non-empty string.
```

Remove the following line in client/package.json:
```
"proxy": "http://localhost:3001",
```
And add this line in front of all the fetch request in client/components:
```
http://localhost:3001
```
and concat http://localhost:3001 with imageUrl in CreateDog.jsx/uploadImage(), line 188
```
var imageUrl = "http://localhost:3001"+response.url;
```

## Approach:
The project was approached by creating a full-stack web application using React for the frontend, Node.js and Express for the backend, and MongoDB as the database. The CRUD (Create, Read, Update, Delete) functionalities were implemented for managing dog entries. Tailwind CSS was used for styling to ease the development process. The choice of these technologies was motivated by the need to facilitate future scalability of the application.

Additionally, the dogs.json file was utilized to extract the names of each dog and their breed (if any). These details were then used to form a modified JSON file. Images for each dog were fetched dynamically from the API provided at [Dog CEO API](https://github.com/ElliottLandsborough/dog-ceo-api) and incorporated into the modified JSON file.

## Status:
The project is completed and meets all the requirements outlined in the client's specifications. 

#### Requirements
- [x]  The interface to the running application must be publicly accessible via the internet.
- [x]  The interface must allow a user to create, read, update, and delete dogs.
- [x]  Interactions with the list must persist, i.e. if I delete the Pug breed, close my browser, then reopen my browser, and view the list, the Pug breed must not be present.


#### Additional Features
- [x] Users can generate a random fact about a dog.
- [x] A search functionality allows users to search through the list of dogs.
- [x] Users can upload a dog along with an image.
- [x] User can rate the dogs on Friendlyness, Activeness, Security.
- [x] An elegant user interface was designed to provide a visually pleasing experience while interacting with the application.

## Credits:
- [Tailwind CSS](https://tailwindcss.com/): Used for styling the frontend interface efficiently.
- [MongoDB](https://www.mongodb.com/): Used as the database management system for storing dog entries.
- [Node.js](https://nodejs.org/): Used for building the backend server.
- [React](https://reactjs.org/): Used for building the frontend user interface.
- [Render](https://render.com/): Used its free services for deployment on server with Github integration.
- [Dog CEO API](https://github.com/ElliottLandsborough/dog-ceo-api): Used for fetching images for dogs.
- [UnSplash](https://unsplash.com/): Free images present in website design.
