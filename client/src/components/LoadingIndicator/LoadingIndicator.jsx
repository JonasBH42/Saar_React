import { LinearProgress, Box } from "@mui/material";

function LoadingIndicator() {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
}

export default LoadingIndicator;
