import React from "react";
import { useState } from "react";
import { Button, TextField, MenuItem, Stack, Typography } from "@mui/material";
import axios from "axios";

const projectStatuses = [
  { value: "Concept", label: "Concept" },
  { value: "Design", label: "Design" },
  { value: "Construction", label: "Construction" },
  { value: "On Hold", label: "On Hold" },
  { value: "Dead", label: "Dead" },
];

const ProjectEdit = ({
  loadAllProjects,
  selectedProjectId,
  project,
  loadProjectPopUp,
}) => {
  console.log(project);
  const [projectNumber, setProjectNumber] = useState(project.projectNumber);
  const [projectName, setProjectName] = useState(project.projectName);
  const [projectStatus, setProjectStatus] = useState(project.projectStatus);

  const saveNewProjectInfo = async () => {
    const newProjectInfo = { projectNumber, projectName, projectStatus };
    await axios.put(
      `http://localhost:3001/api/v1/projects/${selectedProjectId}`,
      newProjectInfo
    );
    await loadProjectPopUp();
    await loadAllProjects();
  };

  return (
    <div>
      <Stack spacing={2}>
        <Typography variant="h6">Update Project Information</Typography>

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

        <Button
          onClick={saveNewProjectInfo}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </Stack>
    </div>
  );
};

export default ProjectEdit;
