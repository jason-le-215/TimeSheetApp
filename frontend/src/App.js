import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import EmployeePopUp from "./components/EmployeePopUp";
import axios from "axios";

function App() {
  const [employeeList, setEmployeeList] = useState([]);

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

  const [selectedEmployeeId, setSelectedEmployeeId] = useState();

  return (
    <div>
      <Header />
      <EmployeeList
        employeeList={employeeList}
        onEmployeePopUp={showEmployeePopUp}
      />
      {Boolean(selectedEmployeeId) && (
        <EmployeePopUp
          selectedEmployeeId={selectedEmployeeId}
          loadAllEmployees={loadAllEmployees}
        />
      )}
    </div>
  );
}

export default App;
