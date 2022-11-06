import AuthNav from "../auth/auth-nav";
import AuthenticationButton from "../auth/authentication-button";
import "./bar.css";

const Bar = () => {
  return (
    <div>
      <AppBar position="absolute" color="tertiary">
        <Toolbar>
          <Typography>Name of Project</Typography>
          <AuthNav />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Bar;
