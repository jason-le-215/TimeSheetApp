import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const EmployeePopUp = ({ selectedEmployeeId, loadAllEmployees }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fn = async () => {
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
    <div>
      <h3>
        {employee.firstname} {employee.lastname}
      </h3>
      <p>Gender: {employee.gender}</p>
      <Button onClick={deleteEmployee} color="error" variant="outlined">
        Delete
      </Button>
    </div>
  );
};

export default EmployeePopUp;
