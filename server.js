const express = require("express");
const app = express();

const path = require("path");

const MongoClient = require("mongodb").MongoClient;

const PORT = 3030;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const MONGO_URL = "mongodb://delta_admin:admin123@localhost:27017";

const client = new MongoClient(MONGO_URL);

// GET all users
app.get("/getUsers", async (req, res) => {
  await client.connect();

  console.log("Connected successfully to server");

  const db = client.db("my-sample-db");

  const data = await db.collection("users").find({}).toArray();

  client.close();

  res.send(data);
});

// ADD user
app.post("/addUser", async (req, res) => {
  const userObj = req.body;

  await client.connect();

  console.log("Connected successfully to server");

  const db = client.db("my-sample-db");

  await db.collection("users").insertOne(userObj);

  client.close();

  res.send("User Added Successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
