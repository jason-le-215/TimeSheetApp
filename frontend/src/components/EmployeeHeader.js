import { Tooltip, Stack, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import EmployeeAdd from "./EmployeeAdd";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const EmployeeHeader = ({
  showAddEmployee,
  setShowAddEmployee,
  loadAllEmployees,
}) => {
  return (
    <div>
      <Stack spacing={2}>
        <Stack alignItems="center" direction="row">
          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Employees
          </Typography>
          <Tooltip title={showAddEmployee ? "Close" : "Add New Employee"}>
            <IconButton
              onClick={() => {
                setShowAddEmployee(!showAddEmployee);
              }}
              color="primary"
            >
              {showAddEmployee ? <CloseIcon color="error" /> : <AddIcon />}
            </IconButton>
          </Tooltip>
        </Stack>

        {showAddEmployee && <EmployeeAdd loadAllEmployees={loadAllEmployees} />}
      </Stack>
    </div>
  );
};

export default EmployeeHeader;
