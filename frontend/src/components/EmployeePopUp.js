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

const EmployeePopUp = ({
  selectedEmployeeId,
  loadAllEmployees,
  setSelectedEmployeeId,
}) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fn = async () => {
      if (!selectedEmployeeId) {
        return;
      }
      const response = await axios.get(
        `http://localhost:3001/api/v1/employees/${selectedEmployeeId}`
      );
      setEmployee(response.data);
    };
    fn();
  }, [selectedEmployeeId]);

  const deleteEmployee = async () => {
    await axios.delete(
      `http://localhost:3001/api/v1/employees/${selectedEmployeeId}`
    );
    await loadAllEmployees();
    setEmployee(null);
  };

  if (!employee) {
    return <p>No employee selected</p>;
  }

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={Boolean(selectedEmployeeId)}
      onClose={() => {
        setSelectedEmployeeId();
      }}
    >
      <DialogTitle>
        {employee.firstname} {employee.lastname}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Gender: {employee.gender}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteEmployee} color="error" variant="outlined">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeePopUp;
