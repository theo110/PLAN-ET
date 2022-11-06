import AuthNav from "../auth/auth-nav";
import AuthenticationButton from "../auth/authentication-button";
import "./bar.css";
import { AppBar, Typography, Toolbar} from "@mui/material";

const Bar = () => {
  return (
    <div>
      <AppBar position="absolute" color="tertiary">
        <Toolbar>
          <Typography>Name of Project</Typography>
          <AuthenticationButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Bar;
