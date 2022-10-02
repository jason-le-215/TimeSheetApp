import React from "react";
import { useState, useEffect } from "react";

import EmployeeHeader from "./EmployeeHeader";
import EmployeeList from "./EmployeeList";
import EmployeePopUp from "./EmployeePopUp";
import { Container, Stack } from "@mui/material";
import axios from "axios";

function Employees() {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState();
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  const loadAllEmployees = async () => {
    const response = await axios.get("http://localhost:3001/api/v1/employees");
    setEmployeeList(response.data);
  };

  useEffect(() => {
    loadAllEmployees();
  }, []);

  const showEmployeePopUp = (id) => {
    setSelectedEmployeeId(id);
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 2 }}>
      <Stack spacing={4}>
        <EmployeeHeader
          showAddEmployee={showAddEmployee}
          setShowAddEmployee={setShowAddEmployee}
          loadAllEmployees={loadAllEmployees}
        />
        <EmployeeList
          employeeList={employeeList}
          onEmployeePopUp={showEmployeePopUp}
        />
        <EmployeePopUp
          selectedEmployeeId={selectedEmployeeId}
          setSelectedEmployeeId={setSelectedEmployeeId}
          loadAllEmployees={loadAllEmployees}
        />
      </Stack>
    </Container>
  );
}

export default Employees;
