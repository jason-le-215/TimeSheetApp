import React from "react";
import { Button, TextField, MenuItem, Stack } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const positions = [
  { value: "Director", label: "Director" },
  { value: "Engineer", label: "Engineer" },
  { value: "Drafter", label: "Drafter" },
  { value: "Admin", label: "Admin" },
];

const EmployeeAdd = ({ loadAllEmployees }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [position, setPosition] = useState("");

  const addNewEmployee = async (e) => {
    e.preventDefault();
    const newEmployee = { firstname, lastname, position };
    await axios.post("http://localhost:3001/api/v1/employees", newEmployee);
    await loadAllEmployees();
    setFirstName("");
    setLastName("");
    setPosition("");
  };

  return (
    <div>
      <form onSubmit={addNewEmployee}>
        <Stack spacing={2}>
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
            label="Positon"
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
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default EmployeeAdd;
