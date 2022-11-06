import AuthNav from "../auth/auth-nav";
import AuthenticationButton from "../auth/authentication-button";
import "./bar.css";

const Bar = () => {
  return (
    <div className="navbar">
      <div className="title">Plan-It</div>
      <AuthenticationButton className="auth-button" />
    </div>
  );
};

export default Bar;
