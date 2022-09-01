import { Button } from "@mui/material";
import AddEmployee from "./AddEmployee";

const Header = ({ showAddEmployeeForm }) => {
  return (
    <div>
      <h1>Employees</h1>
      <AddEmployee />
    </div>
  );
};

export default Header;
