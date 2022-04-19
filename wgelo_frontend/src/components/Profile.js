import React from "react";
import  { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);


  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "chalkchaser.eu.auth0.com";
      try {

        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
        
        setUserMetadata(user_metadata);
      } catch (e) {
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if(isAuthenticated){
  return (
    (
      <div className="logged-in-text">
        you are logged in
      
      </div>
     
    )
  );
    }else{
        return (
            (
              <div className="logged-in-text">
                you are not logged in
              </div>
            )
        )}

}


export default Profile;