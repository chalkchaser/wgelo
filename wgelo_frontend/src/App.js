import './style/App.css'
import PersonTable  from './components/PersonTable'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PlayerAddWindow from './components/PlayerAddWindow'
import  {editPlayersMatch} from './utils/elomath'




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

const Display = ({ navigate, players, sortBy, setSortBy, setPlayers }) => {
  if (navigate === "standings") {
    return (
      <PersonTable persons={players} sortBy={sortBy} setSortBy={setSortBy} />
    )

  }else if(navigate === "record_game"){
    return(
      <PlayerMatchup players={players} setPlayers={setPlayers}></PlayerMatchup>
    )
  
  }
  else {
    return (<div></div>)
  }
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
    <input list="player-data-list" id="player-choice2" name="player 2" value={playerChoiceContent2} onChange={handlePlayerChoiceOnChange2} />
    <DataListPLayerNames players ={players}></DataListPLayerNames>
    <PlayerCard player={currentPlayer1} players={players}/>
    <PlayerCard player={currentPlayer2} players={players}/>
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
  <div><Button onClick={()=> {setPlayers(editPlayersMatch(players,player1,player2,1))}} text="player 1 wins"></Button>
  <Button onClick={()=> {setPlayers(editPlayersMatch(players,player1,player2,-1))}} text="player 2 wins"></Button>
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

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPlayers(response.data)
      console.log(response.data)
      
  })}, [])


  return (
    <div id="all">
      <div id="main">
        <Navigation setNavigate={setNavigate}></Navigation>

        <Display navigate={navigate} players={players} sortBy={sortBy} setSortBy={setSortBy} setPlayers={setPlayers}></Display>
      </div>

      <div id='sideBar'>
        <PlayerAddButton setPlayerform={setPlayerform} />
        <PlayerAddWindow playerForm={playerForm} players={players} setPlayers = {setPlayers}/>

      </div>
    </div>

  );
}

export default App;
