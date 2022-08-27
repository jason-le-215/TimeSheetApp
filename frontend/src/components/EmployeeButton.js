import Button from "@mui/material/Button";
const Employee = ({ employee, onEmployeePopUp }) => {
  return (
    <div onClick={() => onEmployeePopUp(employee._id)}>
      <Button>
        {employee.firstname} {employee.lastname} ({employee.gender})
      </Button>
    </div>
  );
};

export default Employee;
