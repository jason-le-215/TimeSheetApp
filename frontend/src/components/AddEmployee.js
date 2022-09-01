import React from "react";
import { Button, TextField, MenuItem, Stack } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const AddEmployee = ({ loadAllEmployees }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [gender, setGender] = useState("");

  const addNewEmployee = async () => {
    const newEmployee = { firstname, lastname, gender };
    await axios.post("http://localhost:3001/api/v1/employees", newEmployee);
    await loadAllEmployees();
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
            label="Gender"
            size="small"
            fullWidth
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            {genders.map((g) => (
              <MenuItem key={g.value} value={g.value}>
                {g.label}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default AddEmployee;
