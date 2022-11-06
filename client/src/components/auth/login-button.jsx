import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./../bar/Bar";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="login-button"
      onClick={async () =>
        await loginWithRedirect({
          screen_hint: "signup",
        })
      }
    >
      Log In
    </button>
  );
};

export default LoginButton;
