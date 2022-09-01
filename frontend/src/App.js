import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import EmployeePopUp from "./components/EmployeePopUp";
import axios from "axios";
import { Container } from "@mui/material";

function App() {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState();

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
    <Container maxWidth="sm">
      <Header />
      <EmployeeList
        employeeList={employeeList}
        onEmployeePopUp={showEmployeePopUp}
      />
      <EmployeePopUp
        selectedEmployeeId={selectedEmployeeId}
        setSelectedEmployeeId={setSelectedEmployeeId}
        loadAllEmployees={loadAllEmployees}
      />
    </Container>
  );
}

export default App;
