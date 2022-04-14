import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginOutButton = () => {


  
  const { isAuthenticated,loginWithRedirect, logout } = useAuth0();
  if(!isAuthenticated){
    return ( <button id="login-button" onClick={() => loginWithRedirect()}>login</button>)
  }else{
      return(
         <button id="logout-button" onClick={() => logout({ returnTo: window.location.origin })}>
              logout
            </button>
      )
  }
};

export default LoginOutButton;