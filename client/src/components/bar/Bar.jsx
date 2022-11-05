import { Typography, Toolbar, AppBar } from "@mui/material";
import AuthNav from "../auth/auth-nav";

const Bar = () => {
  return (
    <div>
      <AppBar position="absolute" color="primary">
        <Toolbar>
          <Typography>Name of Project</Typography>
          <AuthNav />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Bar;
