const express = require("express");
const app = express();
const cors = require("cors");
const employeeRouter = require("./controllers/employees");
const projectRouter = require("./controllers/projects");

// Middlewares - a function that will be run before other function after it in the stack. Once done it will pass control to the next function.
app.use(cors());
app.use(express.json());
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/projects", projectRouter);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
