# Dogs
 An appplication to perform CRUD operations on Dogs API 

change this in dogs.js and index.js 
router.use(express.static(path.join(__dirname, '../client'))); 

to 

app.use(express.static(path.resolve(__dirname, '../client/build')));