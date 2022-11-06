import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-66icc6khhl2wh82x.us.auth0.com";
  const clientId = "m0vPybM6iLhXKOLsfbV4Opp58qNGvpfj";

  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate("/");
  };
  console.log("url", window.location.origin);
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
