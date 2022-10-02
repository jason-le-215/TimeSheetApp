import { Stack } from "@mui/system";
import EmployeeButton from "./EmployeeButton";

const EmployeeList = ({ employeeList, onEmployeePopUp }) => {
  return (
    <div>
      <Stack spacing={0.5}>
        {employeeList.map((employee) => (
          <EmployeeButton
            key={employee._id}
            employee={employee}
            onEmployeePopUp={onEmployeePopUp}
          />
        ))}
      </Stack>
    </div>
  );
};

export default EmployeeList;
