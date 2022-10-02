const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "TimeSheetApp";

// This is a GET endpoint
// http://localhost:3001/api/v1/projects
router.get("/", async (req, res) => {
  const projectCollection = await connectToProjectCollection();
  const cursor = await projectCollection.find();
  const projects = await cursor.toArray();
  res.status(200).json(projects);
});

// Request structure
// Request with query params: http://localhost:3001/api/v1/projects?userId=1
// Request using resource path: http://localhost:3001/api/v1/projects/1 (preferred way)
router.get("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const projectCollection = await connectToProjectCollection();
  const project = await projectCollection.findOne({
    _id: new ObjectId(projectId),
  });
  res.status(200).json(project);
});

// POST and PUT requests allow for request body/payload to be sent with the request
router.post("/", async (req, res) => {
  // Grab data from request payload
  const { projectNumber, projectName, projectStatus } = req.body;
  const projectCollection = await connectToProjectCollection();

  // Insert new user, await for it to be successful
  const result = await projectCollection.insertOne({
    projectNumber,
    projectName,
    projectStatus,
  });

  // Return status code 201, and the newly created project
  res.status(201).json({
    projectNumber,
    projectName,
    projectStatus,
    _id: result.insertedId.toHexString(),
  });
});

// Database:  Project Number, Project Name, Project Status
router.put("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  // Grab new data from request payload
  const { projectNumber, projectName, projectStatus } = req.body;
  const projectCollection = await connectToProjectCollection();
  await projectCollection.findOneAndUpdate(
    {
      _id: new ObjectId(projectId),
    },
    { $set: { projectNumber, projectName, projectStatus } }
  );
  // Return status code 201, and the newly created project
  res.status(201).json({
    projectNumber,
    projectName,
    projectStatus,
    _id: projectId,
  });
});

router.delete("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const projectCollection = await connectToProjectCollection();
  const result = await projectCollection.findOneAndDelete({
    _id: new ObjectId(projectId),
  });
  res.status(201).json({ success: true, _id: projectId });
});

const connectToProjectCollection = async () => {
  // Connect to MongoDB
  await client.connect();
  // Specify the database in MongoDB to use
  const db = client.db(dbName);
  // Specify the collection in the database to use
  return db.collection("projects");
};

module.exports = router;
