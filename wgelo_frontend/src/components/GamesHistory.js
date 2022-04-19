import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";





const GamesHistory = () => {
    const [gamesHistory, setGamesHistory] = useState([])
    const {getAccessTokenSilently } = useAuth0();
    const [page, setPage] =useState(1)



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
    
  
let numbers = [];
for (let i = 1;  i-1 < gamesHistory.length/12; i++) {
  numbers.push(<button key={i} onClick={() =>{setPage(i)}}>{i}</button>);
}


    return <div>{gamesHistory.reverse().slice((page-1)*12,page*12).map(game =>
    
  
    <div key={game.id} id="games-history">
      <span>{game.player1}</span>
  
      <span>{game.result === 1? ' wins vs ': ' draws vs '}</span>
  
      <span>{game.player2}</span>
  
      <span>{" "+ game.date}</span>
       </div> )}
       <div>{numbers}</div>

       </div>
       
    
  }
  export default GamesHistory