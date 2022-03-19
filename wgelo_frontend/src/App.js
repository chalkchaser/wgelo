import './style/App.css'
import PersonTable  from './components/PersonTable'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PlayerAddWindow from './components/PlayerAddWindow'
import {matchupPlayersAndChangeElo} from './utils/matchupPlayersAndChangeElo'
import LoginOutButton from './components/LoginOutButton'
import Profiles from './components/Profile'
import { useAuth0 } from "@auth0/auth0-react";



const baseUrl = ''



const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      <div className='buttonText'>{props.text}</div>
    </button>
  )
}

const Navigation = ({ setNavigate }) => {

  return (
    <div id='navigation'>
      <Button class text="standings" onClick={() => setNavigate("standings")}></Button>
      <Button text="record game" onClick={() => setNavigate("record_game")}></Button>
      <Button text="history" onClick={() => setNavigate("history")}></Button>
     
    </div>
  )
}

const Display = ({ navigate, players, sortBy, setSortBy, setPlayers, gamesHistory }) => {
  if (navigate === "standings") {
    return (
      <PersonTable persons={players} sortBy={sortBy} setSortBy={setSortBy} />
    )

  }else if(navigate === "record_game"){
    return(
      <PlayerMatchup players={players} setPlayers={setPlayers}></PlayerMatchup>
    )
  
  }
  else if(navigate === "history"){
    return (<GamesHistory gamesHistory={gamesHistory}/>)
  }
}


const GamesHistory = () => {
  const [gamesHistory, setGamesHistory] = useState([])

  useEffect(() => {
    axios
    .get(baseUrl + '/games')
    .then(response => {
      setGamesHistory(response.data)
      console.log(response.data)
      
  })}, [])

  

  return <div>{gamesHistory.map(game =>
  

  <div id="games-history">
    <span>{game.player1}</span>

    <span>{game.result === 1? ' wins vs ': ' draws vs '}</span>

    <span>{game.player2}</span>

    <span>{" "+ game.date}</span>
     </div> )}</div>
  
}

const PlayerMatchup = ({players, setPlayers}) => {
  const [playerChoiceContent1, setPlayerChoiceContent1] = useState('')
  const [playerChoiceContent2, setPlayerChoiceContent2] = useState('')
  const [currentPlayer1, setCurrentPlayer1] = useState()
  const [currentPlayer2, setCurrentPlayer2] = useState()


  const handlePlayerChoiceOnChange1 = (event) => {
  
    setPlayerChoiceContent1(event.target.value)
         
    if(players.find(player => player.name === event.target.value)){
      setCurrentPlayer1(players.find(player => player.name === event.target.value))
    }
 
  }

  
  const handlePlayerChoiceOnChange2 = (event) => {
    setPlayerChoiceContent2(event.target.value)
         
    if(players.find(player => player.name === event.target.value)){
      setCurrentPlayer2(players.find(player => player.name === event.target.value))
    }
  }

  return( 

   <div>
    <input list="player-data-list" id="player-choice1" name="player 1" value={playerChoiceContent1} onChange={handlePlayerChoiceOnChange1} />
    <DataListPLayerNames players ={players}></DataListPLayerNames>
    <span> vs </span>
    <input list="player-data-list" id="player-choice2" name="player 2" value={playerChoiceContent2} onChange={handlePlayerChoiceOnChange2} />
    <DataListPLayerNames players ={players}></DataListPLayerNames>
    <div id= "player-card-container">
    <PlayerCard player={currentPlayer1} players={players}/>
    <PlayerCard player={currentPlayer2} players={players}/>
    </div>
    <MatchConfirmButton setPlayers={setPlayers} players={players} player1={currentPlayer1} player2 ={currentPlayer2} result={1}/>


  </div>

  )
}

const PlayerCard = ({player}) =>{
  if(player){
  return(
    <div className="player-card">
      <p>{player.name}</p> 
      <p>{player.elo.at(-1)}</p>
      </div>
  )}
  else{return null}

 
  }

const DataListPLayerNames = ({players}) => {   

  return(
  <datalist id="player-data-list">
  {      players
            .map(player => <option value={player.name} key={player.id}/>)}
  </datalist>

  )

}

const PlayerAddButton = ({ setPlayerform }) => {

  return (
    <Button text="+player" onClick={(() => setPlayerform(true))} ></Button>
  )
}


const MatchConfirmButton = ({setPlayers, players, player1, player2}) =>{
  if(player1 &&player2){
  return(
  <div id="win-buttons">
    <Button onClick={()=> matchupPlayersAndChangeElo(setPlayers, players, player1, player2, 1)} text={player1.name + " WINS🏆"}></Button>
    <Button onClick={()=> matchupPlayersAndChangeElo(setPlayers, players, player1, player2, -1)} text={player2.name + " WINS🏆"}></Button>
    <Button onClick={()=> matchupPlayersAndChangeElo(setPlayers, players, player1, player2, 0)} text={"Draw"}></Button>
  </div>
  )
  }else{return null}
}





function App() {
  const [players, setPlayers] = useState([])
  const [navigate, setNavigate] = useState('standings')
  const [sortBy, setSortBy] = useState('elo')
  const [playerForm, setPlayerform] = useState(false)



  //useEffect(() => { setPlayers(data.persons) }, [])

  /*
  useEffect(() => {
    axios
    .get(baseUrl + '/persons')
    .then(response => {
      setPlayers(response.data)
      console.log(response.data)
      
  })}, [])

  */
 
    const {getAccessTokenSilently } = useAuth0();
    
  
    
    useEffect(() => {
     
  
      const getUserMetadata = async () => {
        const domain = "chalkchaser.eu.auth0.com";
        try {
  
          const accessToken = await getAccessTokenSilently({
            audience: `https://wgelo/api`,
            scope: "openid",
          }
  
          
          )
          console.log(accessToken)
          
          const options = { 
            method: "GET",
            url: baseUrl +"/persons",
            headers: { "authorization": "Bearer " + accessToken },
          };
        
            axios(options)
        .then(response => {
          setPlayers(response.data);
        })
  
        
    }    catch (e) {
      console.log(e.message);
    }
  
    }
  
    getUserMetadata()
  }, [])
  



 


  return (
   
    <div id="all">
       <span id="top">   
          <LoginOutButton/>
          <Profiles/>
        </span>
      <div id="main">
        <Navigation setNavigate={setNavigate}></Navigation>

        <Display navigate={navigate} players={players} sortBy={sortBy} setSortBy={setSortBy} setPlayers={setPlayers} ></Display>
      </div>

      <div id='sideBar'>
        <PlayerAddButton setPlayerform={setPlayerform} />
        <PlayerAddWindow playerForm={playerForm} players={players} setPlayers = {setPlayers}/>
        
      </div>
    </div>

  );
}

export default App;
