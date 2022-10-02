import { Tooltip, Stack, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import ProjectAdd from "./ProjectAdd";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const ProjectHeader = ({
  showAddProject,
  setShowAddProject,
  loadAllProjects,
}) => {
  return (
    <div>
      <Stack spacing={2}>
        <Stack alignItems="center" direction="row">
          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Projects
          </Typography>
          <Tooltip title={showAddProject ? "Close" : "Add New Project"}>
            <IconButton
              onClick={() => {
                setShowAddProject(!showAddProject);
              }}
              color="primary"
            >
              {showAddProject ? <CloseIcon color="error" /> : <AddIcon />}
            </IconButton>
          </Tooltip>
        </Stack>

        {showAddProject && <ProjectAdd loadAllProjects={loadAllProjects} />}
      </Stack>
    </div>
  );
};

export default ProjectHeader;
