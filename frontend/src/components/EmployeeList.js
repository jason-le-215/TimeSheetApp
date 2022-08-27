import EmployeeButton from "./EmployeeButton";

const EmployeeList = ({ employeeList, onEmployeePopUp }) => {
  return (
    <div>
      {employeeList.map((employee) => (
        <EmployeeButton
          key={employee._id}
          employee={employee}
          onEmployeePopUp={onEmployeePopUp}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
