import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./../bar/Bar";
import { useNavigate } from "react-router";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  async function handleClick(){
    await loginWithRedirect({
      screen_hint: "signup",
    })
  }
  return (
    <button
      className="login-button"
      onClick={handleClick}
    >
      Log In
    </button>
  );
};

export default LoginButton;
