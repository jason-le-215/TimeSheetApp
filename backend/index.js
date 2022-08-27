const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "TimeSheetApp";

const database = [
  { firstname: "Jason", lastname: "Le", employeeId: "1", gender: "male" },
  { firstname: "Maximus", lastname: "Le", employeeId: "2", gender: "male" },
  { firstname: "Nga", lastname: "Nguyen", employeeId: "3", gender: "female" },
];

// Middlewares - a function that will be run before other function after it in the stack. Once done it will pass control to the next function.
app.use(cors());
app.use(express.json());

// This is a GET endpoint
// http://localhost:3001/api/v1/employees
app.get("/api/v1/employees", async (req, res) => {
  const employeeCollection = await connectToEmployeeCollection();
  const cursor = await employeeCollection.find();
  const employees = await cursor.toArray();
  res.status(200).json(employees);
});

// Request structure
// Request with query params: http://localhost:3001/api/v1/employees?userId=1
// Request using resource path: http://localhost:3001/api/v1/employees/1 (preferred way)
app.get("/api/v1/employees/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  const employeeCollection = await connectToEmployeeCollection();
  const employee = await employeeCollection.findOne({
    _id: new ObjectId(employeeId),
  });
  res.status(200).json(employee);
});

// POST and PUT requests allow for request body/payload to be sent with the request
app.post("/api/v1/employees", async (req, res) => {
  // Grab data from request payload
  const { firstname, lastname, gender } = req.body;
  const employeeCollection = await connectToEmployeeCollection();

  // Insert new user, await for it to be successful
  const result = await employeeCollection.insertOne({
    firstname,
    lastname,
    gender,
  });

  // Return status code 201, and the newly created employee
  res.status(201).json({
    firstname,
    lastname,
    gender,
    _id: result.insertedId.toHexString(),
  });
});

// Database:  Jason Le, male
app.put("/api/v1/employees/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  // Grab new data from request payload
  const { firstname, lastname, gender } = req.body;
  const employeeCollection = await connectToEmployeeCollection();
  await employeeCollection.findOneAndUpdate(
    {
      _id: new ObjectId(employeeId),
    },
    { $set: { firstname, lastname, gender } }
  );
  // Return status code 201, and the newly created employee
  res.status(201).json({
    firstname,
    lastname,
    gender,
    _id: employeeId,
  });
});

app.delete("/api/v1/employees/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  const employeeCollection = await connectToEmployeeCollection();
  const result = await employeeCollection.findOneAndDelete({
    _id: new ObjectId(employeeId),
  });
  res.status(201).json({ success: true, _id: employeeId });
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

const connectToEmployeeCollection = async () => {
  // Connect to MongoDB
  await client.connect();
  // Specify the database in MongoDB to use
  const db = client.db(dbName);
  // Specify the collection in the database to use
  return db.collection("employees");
};
