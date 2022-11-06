import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const options = { redirect_url: "localhost:3000" };
  return (
    <button
      className="btn btn-primary btn-block"
      onClick={() => loginWithRedirect(options)}
    >
      Log In
    </button>
  );
};

export default LoginButton;
