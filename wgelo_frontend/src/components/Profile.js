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
        console.log(domain)

        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        console.log(userDetailsByIdUrl)

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
        
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
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
      <div>
        you are logged in as {user.name}
        <h3>User Metadata</h3>
      {userMetadata ? (
        <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
      ) : (
        "No user metadata defined"
      )}
      </div>
     
    )
  );
    }else{
        return (
            (
              <div>
                you are not logged in
              </div>
            )
        )}

}


export default Profile;