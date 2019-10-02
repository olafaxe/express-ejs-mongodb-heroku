const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//use template engine
app.set("view engine", "ejs");

//parsing incoming requests
app.use(
  express.urlencoded({
    extended: true
  })
);

let db;

client.connect(function(err) {
  if (err) throw err;
  db = client.db("fake");
});

//use static files
// app.use(express.static("views/public"));

//simple get rout with variable sent to "/" for use at pages/index
// app.get("/", (req, res) => {
//   let motto = "this is a variable";

//   res.render("pages/index", { motto: motto });
// });

app.get("/", (req, res) => {
  const usersCollection = db.collection("users");
  usersCollection.find({}).toArray(function(err, users) {
    res.send(users);
  });
});

app.listen(port, () => {
  console.log(`Lyssnar på port: ${port}`);
});
