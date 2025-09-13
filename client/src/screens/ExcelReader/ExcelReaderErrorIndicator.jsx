import { Alert, Collapse } from "@mui/material";

function ExcelReaderErrorIndicator({
  isOpen = true,
  severity = "success",
  children,
}) {
  return (
    <Collapse in={isOpen}>
      <Alert severity={severity}>
        <span
          style={{
            padding: "5px",
            fontFamily: "Open Sans",
            fontSize: "16px",
          }}
        >
          {children}
        </span>
      </Alert>
    </Collapse>
  );
}

export default ExcelReaderErrorIndicator;
