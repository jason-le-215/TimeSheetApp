import React from "react";
import { Button, TextField, MenuItem, Stack } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const projectStatuses = [
  { value: "Concept", label: "Concept" },
  { value: "Design", label: "Design" },
  { value: "Construction", label: "Construction" },
  { value: "On Hold", label: "On Hold" },
  { value: "Dead", label: "Dead" },
];

const ProjectAdd = ({ loadAllProjects }) => {
  const [projectNumber, setProjectNumber] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectStatus, setProjectStatus] = useState("");

  const addNewProject = async (e) => {
    e.preventDefault();
    const newProject = { projectNumber, projectName, projectStatus };
    await axios.post("http://localhost:3001/api/v1/projects", newProject);
    await loadAllProjects();
    setProjectNumber("");
    setProjectName("");
    setProjectStatus("");
  };

  return (
    <div>
      <form onSubmit={addNewProject}>
        <Stack spacing={2}>
          <TextField
            label="Project Number"
            fullWidth
            size="small"
            value={projectNumber}
            onChange={(e) => setProjectNumber(e.target.value)}
          />
          <TextField
            label="Project Name"
            fullWidth
            size="small"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextField
            select
            label="Status"
            size="small"
            fullWidth
            value={projectStatus}
            onChange={(e) => setProjectStatus(e.target.value)}
          >
            {projectStatuses.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default ProjectAdd;
