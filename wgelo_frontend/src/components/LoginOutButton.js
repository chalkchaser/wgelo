import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginOutButton = () => {


  
  const { isAuthenticated,loginWithPopup, logout } = useAuth0();
  if(!isAuthenticated){
    return ( <button onClick={() => loginWithPopup()}>Log In</button>)
  }else{
      return(
         <button onClick={() => logout({ returnTo: window.location.origin })}>
              Log Out
            </button>
      )
  }
};

export default LoginOutButton;