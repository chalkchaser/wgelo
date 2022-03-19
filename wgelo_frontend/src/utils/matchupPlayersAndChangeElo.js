import axios from 'axios'
import  {matchPlayersElo} from './elomath'
import { useAuth0 } from "@auth0/auth0-react";




const baseUrl = ''


const putPlayer = async (player, getAccessTokenSilently) => {
  const domain = "chalkchaser.eu.auth0.com";
  try {

    const accessToken = await getAccessTokenSilently({
      audience: `https://wgelo/api`,
      scope: "openid",
    }

    
    )
    
    const options = { 
      method: "PUT",
      url: `/persons/${player.id}`,
      headers: { "authorization": "Bearer " + accessToken },
      data: player
    };
  
  console.log("try to put player")

   axios(options)
  .then(response => {
    console.log(response)

  })

  
}    catch (e) {
console.log(e.message);
}

}


const postGame = async (game,getAccessTokenSilently) => {
  const domain = "chalkchaser.eu.auth0.com";
  try {

    const accessToken = await getAccessTokenSilently({
      audience: `https://wgelo/api`,
      scope: "openid",
    }

    
    )
    
    const options = { 
      method: "POST",
      url: '/games',
      headers: { "authorization": "Bearer " + accessToken },
      data: game
    };
  

   axios(options)
  .then(response => {
    console.log(response)

  })

  
}    catch (e) {
console.log(e.message);
}

}


const matchupPlayersAndChangeElo = (setPlayers, players, player1, player2, result, getAccessTokenSilently) =>{
    const changed = matchPlayersElo(player1,player2, result)
  
    setPlayers(players.map(player =>{
        if( player1.id === player.id) {return changed[0]}
        else if(player2.id === player.id){return changed[1]}
        else{return player}
        }
      )
    )
  
    //TODO: change to check for JWT


        /*
    axios.put(baseUrl + `/persons/${player1.id}`,player1).then(response =>
    console.log(response)
    )
    axios.put(baseUrl + `/persons/${player2.id}`,player2).then(response =>
    console.log(response)
    )*/

    
   

  putPlayer(player1, getAccessTokenSilently)
  putPlayer(player2, getAccessTokenSilently)


  
    let gameObject = {
      player1: player1.name,
      player2: player2.name,
      result: Math.abs(result),
      date: new Date().toLocaleDateString()
    }
      
    if(result === -1){
      gameObject.player2 = player1.name
      gameObject.player1 = player2.name
    }
  
  
    postGame(gameObject, getAccessTokenSilently)
    
  }
  export  {matchupPlayersAndChangeElo}