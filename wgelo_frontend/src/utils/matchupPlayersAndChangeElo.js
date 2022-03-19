import axios from 'axios'
import  {matchPlayersElo} from './elomath'



const baseUrl = ''

const matchupPlayersAndChangeElo = (setPlayers, players, player1, player2, result) =>{
    const changed = matchPlayersElo(player1,player2, result)
  
    setPlayers(players.map(player =>{
        if( player1.id === player.id) {return changed[0]}
        else if(player2.id === player.id){return changed[1]}
        else{return player}
        }
      )
    )
  
    //TODO: change to check for JWT

    axios.put(baseUrl + `/persons/${player1.id}`,player1).then(response =>
    console.log(response)
    )
    axios.put(baseUrl + `/persons/${player2.id}`,player2).then(response =>
    console.log(response)
    )
  
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
  
  
    axios
        .post(baseUrl + '/games', gameObject)
        .then(response => {
          console.log(response)
        })
    
  }
  export  {matchupPlayersAndChangeElo}