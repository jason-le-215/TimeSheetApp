import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { Stack } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const EmployeeProjectList = ({
  employee,
  linkedproject,
  setLinkedProject,
  linkProject,
  projectList,
  unlinkProject,
  unlinkedproject,
  setUnlinkedProject,
}) => {
  console.log(linkedproject);

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Projects ({employee.projects.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            <Stack direction="row" spacing={2}>
              <Autocomplete
                onChange={(event, newValue) => {
                  setLinkedProject(newValue);
                }}
                sx={{ flexGrow: 1 }}
                size="small"
                id="add-project"
                options={projectList}
                getOptionLabel={(project) =>
                  project.projectNumber + " - " + project.projectName
                }
                value={linkedproject}
                renderInput={(params) => (
                  <TextField {...params} label="Add Project" />
                )}
              />
              <Button onClick={linkProject} variant="contained">
                Add
              </Button>
            </Stack>
            {employee.projects.map((project) => (
              <Stack
                key={project._id}
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Typography>
                  {project.projectNumber} - {project.projectName}
                </Typography>
                <Tooltip title="Unlink Project">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => unlinkProject(project)}
                  >
                    <CloseIcon color="error" />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default EmployeeProjectList;
