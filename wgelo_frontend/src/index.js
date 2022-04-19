import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="chalkchaser.eu.auth0.com"
    clientId="LtACTx3xLWMwn7LmFQmJY5LZ7JAbgqGu"
    redirectUri={window.location.origin}
    audience="https://chalkchaser.eu.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
    useRefreshTokens= "true"
    cacheLocation= "localstorage"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);