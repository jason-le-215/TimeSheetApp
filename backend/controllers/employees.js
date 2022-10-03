const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "TimeSheetApp";

// This is a GET endpoint
// http://localhost:3001/api/v1/employees
router.get("/", async (req, res) => {
  const employeeCollection = await connectToEmployeeCollection();
  const cursor = await employeeCollection.find();
  const employees = await cursor.toArray();
  res.status(200).json(employees);
});

// Request structure
// Request with query params: http://localhost:3001/api/v1/employees?userId=1
// Request using resource path: http://localhost:3001/api/v1/employees/1 (preferred way)
router.get("/:employeeId", async (req, res) => {
  const { employeeId } = req.params;

  const pipeline = [
    {
      $match: {
        _id: new ObjectId(employeeId),
      },
    },
    {
      $addFields: {
        projectObjectIds: {
          $map: {
            input: "$projectIds",
            as: "projectId",
            in: {
              $convert: {
                input: "$$projectId",
                to: "objectId",
              },
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "projectObjectIds",
        foreignField: "_id",
        as: "projects",
      },
    },
    {
      $project: {
        projectIds: 0,
        projectObjectIds: 0,
      },
    },
  ];
  const employeeCollection = await connectToEmployeeCollection();
  const cursor = await employeeCollection.aggregate(pipeline);
  const employees = await cursor.toArray();
  res.status(200).json(employees[0]);
});

// POST and PUT requests allow for request body/payload to be sent with the request
router.post("/", async (req, res) => {
  // Grab data from request payload
  const { firstname, lastname, position } = req.body;
  const employeeCollection = await connectToEmployeeCollection();

  // Insert new user, await for it to be successful
  const result = await employeeCollection.insertOne({
    firstname,
    lastname,
    position,
  });

  // Return status code 201, and the newly created employee
  res.status(201).json({
    firstname,
    lastname,
    position,
    _id: result.insertedId.toHexString(),
  });
});

// Database:  Jason Le, male
router.put("/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  // Grab new data from request payload
  const { firstname, lastname, position } = req.body;
  const employeeCollection = await connectToEmployeeCollection();
  await employeeCollection.findOneAndUpdate(
    {
      _id: new ObjectId(employeeId),
    },
    { $set: { firstname, lastname, position } }
  );
  // Return status code 201, and the newly created employee
  res.status(201).json({
    firstname,
    lastname,
    position,
    _id: employeeId,
  });
});

router.put("/:employeeId/projects/:projectId/link", async (req, res) => {
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

router.put("/:employeeId/projects/:projectId/unlink", async (req, res) => {
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

router.delete("/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  const employeeCollection = await connectToEmployeeCollection();
  const result = await employeeCollection.findOneAndDelete({
    _id: new ObjectId(employeeId),
  });
  res.status(201).json({ success: true, _id: employeeId });
});

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
