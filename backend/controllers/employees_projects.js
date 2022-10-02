const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "TimeSheetApp";

router.put("/link/:employeeId/:projectId", async (req, res) => {
  const { employeeId } = req.params;
  const { projectId } = req.params;

  // Grab new data from request payload

  const employeeCollection = await connectToEmployeeCollection();
  const projectCollection = await connectToProjectCollection();

  await employeeCollection.findOneAndUpdate(
    {
      _id: new ObjectId(employeeId),
    },
    { $addToSet: { projectIds: projectId } }
  );

  await projectCollection.findOneAndUpdate(
    {
      _id: new ObjectId(projectId),
    },
    { $addToSet: { employeeIds: employeeId } }
  );

  // Return status code 201, and the newly created project
  res.status(201).json({
    employeeId,
    projectId,
  });
});

router.put("/unlink/:employeeId/:projectId", async (req, res) => {
  const { employeeId } = req.params;
  const { projectId } = req.params;

  // Grab new data from request payload

  const employeeCollection = await connectToEmployeeCollection();
  const projectCollection = await connectToProjectCollection();

  await employeeCollection.findOneAndUpdate(
    {
      _id: new ObjectId(employeeId),
    },
    { $pull: { projectIds: projectId } }
  );

  await projectCollection.findOneAndUpdate(
    {
      _id: new ObjectId(projectId),
    },
    { $pull: { employeeIds: employeeId } }
  );

  // Return status code 201, and the newly created project
  res.status(201).json({
    employeeId,
    projectId,
  });
});

////////////////////////

const connectToEmployeeCollection = async () => {
  // Connect to MongoDB
  await client.connect();
  // Specify the database in MongoDB to use
  const db = client.db(dbName);
  // Specify the collection in the database to use
  return db.collection("employees");
};

const connectToProjectCollection = async () => {
  // Connect to MongoDB
  await client.connect();
  // Specify the database in MongoDB to use
  const db = client.db(dbName);
  // Specify the collection in the database to use
  return db.collection("projects");
};
module.exports = router;
