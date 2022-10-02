import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ProjectEdit from "./ProjectEdit";
import { Stack } from "@mui/system";

const ProjectPopUp = ({
  selectedProjectId,
  loadAllProjects,
  setSelectedProjectId,
}) => {
  const [project, setProject] = useState(null);
  const [showEditProject, setshowEditProject] = useState(false);

  const loadProjectPopUp = async () => {
    if (!selectedProjectId) {
      return;
    }
    const response = await axios.get(
      `http://localhost:3001/api/v1/projects/${selectedProjectId}`
    );
    setProject(response.data);
  };

  useEffect(() => {
    loadProjectPopUp();
  }, [selectedProjectId]);

  const deleteProject = async () => {
    await axios.delete(
      `http://localhost:3001/api/v1/projects/${selectedProjectId}`
    );
    await loadAllProjects();
    setProject(null);
  };

  if (!project) {
    return null;
  }

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={Boolean(selectedProjectId)}
      onClose={() => {
        setSelectedProjectId();
        setshowEditProject(false);
      }}
    >
      <DialogTitle fontWeight="bold" variant="h4">
        {project.projectNumber} - {project.projectName}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <DialogContentText>Status: {project.projectStatus}</DialogContentText>
          {showEditProject && (
            <ProjectEdit
              selectedProjectId={selectedProjectId}
              loadAllProjects={loadAllProjects}
              loadProjectPopUp={loadProjectPopUp}
              project={project}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            onClick={() => {
              setshowEditProject(!showEditProject);
            }}
            color="primary"
            variant="outlined"
          >
            Edit
          </Button>

          <Button onClick={deleteProject} color="error" variant="outlined">
            Delete
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectPopUp;
