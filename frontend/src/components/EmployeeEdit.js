import React from "react";
import { useState } from "react";
import { Button, TextField, MenuItem, Stack, Typography } from "@mui/material";
import axios from "axios";

const positions = [
  { value: "Director", label: "Director" },
  { value: "Engineer", label: "Engineer" },
  { value: "Drafter", label: "Drafter" },
  { value: "Admin", label: "Admin" },
];

const EmployeeEdit = ({
  loadAllEmployees,
  selectedEmployeeId,
  employee,
  loadEmployeePopUp,
}) => {
  const [firstname, setFirstName] = useState(employee.firstname);
  const [lastname, setLastName] = useState(employee.lastname);
  const [position, setPosition] = useState(employee.position);

  const saveNewEmployeeInfo = async () => {
    const newEmployeeInfo = { firstname, lastname, position };
    await axios.put(
      `http://localhost:3001/api/v1/employees/${selectedEmployeeId}`,
      newEmployeeInfo
    );
    await loadEmployeePopUp();
    await loadAllEmployees();
  };

  return (
    <div>
      <Stack spacing={2}>
        <Typography variant="h6">Update Employee Information</Typography>

        <TextField
          label="First Name"
          fullWidth
          size="small"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          fullWidth
          size="small"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          select
          label="Position"
          size="small"
          fullWidth
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          {positions.map((p) => (
            <MenuItem key={p.value} value={p.value}>
              {p.label}
            </MenuItem>
          ))}
        </TextField>

        <Button
          onClick={saveNewEmployeeInfo}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </Stack>
    </div>
  );
};

export default EmployeeEdit;
