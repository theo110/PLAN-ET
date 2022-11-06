import AuthenticationButton from "../auth/authentication-button";
import "./bar.css";
import { AppBar, Typography, Toolbar } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom"

const Bar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  }

  return (
    <div>
      <AppBar position="absolute" color="tertiary">
        <Toolbar>
          <div className="logo-container" onClick={handleClick}>
            <Logo className="logo" width="3rem" />
            <Typography style={{ fontWeight: 600, fontSize: "2rem" }}>PLAN-ET</Typography>
          </div>
          <AuthenticationButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Bar;
