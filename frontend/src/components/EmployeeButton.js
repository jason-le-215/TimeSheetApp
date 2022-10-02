import Button from "@mui/material/Button";

const EmployeeButon = ({ employee, onEmployeePopUp }) => {
  return (
    <div onClick={() => onEmployeePopUp(employee._id)}>
      <Button sx={{ fontWeight: "medium" }}>
        {employee.firstname} {employee.lastname}
      </Button>
    </div>
  );
};

export default EmployeeButon;
