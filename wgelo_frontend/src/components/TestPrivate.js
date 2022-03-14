import React from "react";
import  { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";



const Private = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  //const [userMetadata, setUserMetadata] = useState(null);

  
  useEffect(() => {
   

    const getUserMetadata = async () => {
      const domain = "chalkchaser.eu.auth0.com";
      try {

        const accessToken = await getAccessTokenSilently({
          audience: `https://wgelo/api`,
          scope: "read:current_user",
        }

        
        )
        console.log(accessToken)
        
        const options = { 
          method: "GET",
          url: "http://localhost:3001/api/private",
          headers: { "authorization": "Bearer " + accessToken },
        };
      
          axios(options)
      .then(response => {
        console.log(response.data);
      })

        const Players = await{

        }
  }    catch (e) {
    console.log(e.message);
  }

  }

  getUserMetadata()
}, [])

return(
  <div></div>
)
}

export default Private;