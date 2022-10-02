import Button from "@mui/material/Button";

const ProjectButton = ({ employee: project, showProjectPopUp }) => {
  return (
    <div onClick={() => showProjectPopUp(project._id)}>
      <Button sx={{ fontWeight: "medium" }}>
        {project.projectNumber} - {project.projectName}
      </Button>
    </div>
  );
};

export default ProjectButton;
