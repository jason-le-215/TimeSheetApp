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
import EmployeeEdit from "./EmployeeEdit";
import { Stack } from "@mui/system";
import EmployeeList from "./EmployeeList";
import EmployeeProjectList from "./EmployeeProjectList";

const EmployeePopUp = ({
  selectedEmployeeId,
  loadAllEmployees,
  setSelectedEmployeeId,
}) => {
  const [employee, setEmployee] = useState(null);
  const [showEditEmployee, setshowEditEmployee] = useState(false);

  const [projectList, setProjectList] = useState([]);

  const getAllProjects = async () => {
    const response = await axios.get("http://localhost:3001/api/v1/projects");
    setProjectList(response.data);
  };
  useEffect(() => {
    getAllProjects();
  }, []);
  const [linkedproject, setLinkedProject] = useState(null);
  const [unlinkedproject, setUnlinkedProject] = useState(null);

  const loadEmployeePopUp = async () => {
    if (!selectedEmployeeId) {
      return;
    }
    const response = await axios.get(
      `http://localhost:3001/api/v1/employees/${selectedEmployeeId}`
    );
    setEmployee(response.data);
  };

  useEffect(() => {
    loadEmployeePopUp();
  }, [selectedEmployeeId]);

  const deleteEmployee = async () => {
    await axios.delete(
      `http://localhost:3001/api/v1/employees/${selectedEmployeeId}`
    );
    await loadAllEmployees();
    setEmployee(null);
  };

  const linkProject = async () => {
    await axios.put(
      `http://localhost:3001/api/v1/employees_projects/link/${selectedEmployeeId}/${linkedproject._id}`
    );
    await loadEmployeePopUp();
    setLinkedProject(null);
  };

  const unlinkProject = async (project) => {
    await axios.put(
      `http://localhost:3001/api/v1/employees_projects/unlink/${selectedEmployeeId}/${project._id}`
    );
    await loadEmployeePopUp();
  };

  if (!employee) {
    return null;
  }

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={Boolean(selectedEmployeeId)}
      onClose={() => {
        setSelectedEmployeeId();
        setshowEditEmployee(false);
      }}
    >
      <DialogTitle fontWeight="bold" variant="h4">
        {employee.firstname} {employee.lastname}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <DialogContentText>Position: {employee.position}</DialogContentText>
          <EmployeeProjectList
            employee={employee}
            projectList={projectList}
            linkedproject={linkedproject}
            setLinkedProject={setLinkedProject}
            linkProject={linkProject}
            unlinkProject={unlinkProject}
            unlinkedproject={unlinkedproject}
            setUnlinkedProject={setUnlinkedProject}
          />
          {showEditEmployee && (
            <EmployeeEdit
              selectedEmployeeId={selectedEmployeeId}
              loadAllEmployees={loadAllEmployees}
              loadEmployeePopUp={loadEmployeePopUp}
              employee={employee}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            onClick={() => {
              setshowEditEmployee(!showEditEmployee);
            }}
            color="primary"
            variant="outlined"
          >
            Edit
          </Button>

          <Button onClick={deleteEmployee} color="error" variant="outlined">
            Delete
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeePopUp;
