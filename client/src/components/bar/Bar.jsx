import AuthenticationButton from "../auth/authentication-button";
import "./bar.css";
import { AppBar, Typography, Toolbar } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/logo.svg"

const Bar = () => {
  return (
    <div>
      <AppBar position="absolute" color="tertiary">
        <Toolbar>
          <Logo className="logo" width="3rem" />
          <Typography style={{ fontWeight: 600, fontSize: "2rem" }}>PLAN-ET</Typography>
          <AuthenticationButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Bar;
