import { Stack } from "@mui/system";
import ProjectButton from "./ProjectButton";

const ProjectList = ({ projectList, showProjectPopUp }) => {
  return (
    <div>
      <Stack spacing={0.5}>
        {projectList.map((project) => (
          <ProjectButton
            key={project._id}
            employee={project}
            showProjectPopUp={showProjectPopUp}
          />
        ))}
      </Stack>
    </div>
  );
};

export default ProjectList;
