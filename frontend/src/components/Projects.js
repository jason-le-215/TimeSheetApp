import React from "react";
import { useState, useEffect } from "react";

import ProjectHeader from "./ProjectHeader";
import ProjectList from "./ProjectList";
import ProjectPopUp from "./ProjectPopUp";
import { Container, Stack } from "@mui/material";
import axios from "axios";

function Projects() {
  const [projectList, setProjectList] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState();
  const [showAddProject, setShowAddProject] = useState(false);

  const loadAllProjects = async () => {
    const response = await axios.get("http://localhost:3001/api/v1/projects");
    setProjectList(response.data);
  };

  useEffect(() => {
    loadAllProjects();
  }, []);

  const showProjectPopUp = (id) => {
    setSelectedProjectId(id);
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 2 }}>
      <Stack spacing={4}>
        <ProjectHeader
          showAddProject={showAddProject}
          setShowAddProject={setShowAddProject}
          loadAllProjects={loadAllProjects}
        />
        <ProjectList
          projectList={projectList}
          showProjectPopUp={showProjectPopUp}
        />
        <ProjectPopUp
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          loadAllProjects={loadAllProjects}
        />
      </Stack>
    </Container>
  );
}

export default Projects;
