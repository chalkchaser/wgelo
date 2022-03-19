import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";





const GamesHistory = () => {
    const [gamesHistory, setGamesHistory] = useState([])
    const {getAccessTokenSilently } = useAuth0();

    useEffect(() => {

    const getGames = async () => {
        const domain = "chalkchaser.eu.auth0.com";
        try {
    
          const accessToken = await getAccessTokenSilently({
            audience: `https://wgelo/api`,
            scope: "openid",
          }
    
          
          )
          
          const options = { 
            method: "GET",
            url: "/games",
            headers: { "authorization": "Bearer " + accessToken },
          };
        
        console.log("try to get games")
    
         axios(options)
        .then(response => {
            setGamesHistory(response.data)
        })
    
        
    }    catch (e) {
      console.log(e.message);
    }

    }  
    getGames()
}, [])
    
  
    return <div>{gamesHistory.map(game =>
    
  
    <div id="games-history">
      <span>{game.player1}</span>
  
      <span>{game.result === 1? ' wins vs ': ' draws vs '}</span>
  
      <span>{game.player2}</span>
  
      <span>{" "+ game.date}</span>
       </div> )}</div>
    
  }
  export default GamesHistory