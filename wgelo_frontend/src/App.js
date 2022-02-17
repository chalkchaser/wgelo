import './style/App.css'
import PersonTable  from './components/PersonTable'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PlayerAddWindow from './components/PlayerAddWindow'

const K_VALUE =32


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

const Display = ({ navigate, players, sortBy, setSortBy }) => {
  if (navigate === "standings") {
    return (
      <PersonTable persons={players} sortBy={sortBy} setSortBy={setSortBy} />
    )

  }else if(navigate = "record_game"){
    return(
      <PlayerMatchup players={players}></PlayerMatchup>
    )
  
  }
  else {
    return (<div></div>)
  }
}

const PlayerMatchup = ({players}) => {
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

  </div>

  )
}

const PlayerCard = ({player}) =>{
  if(player){
  return(
    <div class="player-card">
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


const  matchPlayersElo= (player1, player2, result) => { // 1 equals win for player 1, 0 equals draw, -1 equals loss

    const new_elos = calculateElo(player1.elo.at(-1), player2.elo.at(-1), result)
    const new_player1 = player1
    const new_player2 = player2

    new_player1.elo = player1.elo.concat(new_elos[0])
    new_player2.elo = player2.elo.concat(new_elos[1])

  return [new_player1,new_player2]
}

const editPlayersMatch =(players,player1,player2,result)=>{
  const new_elos = matchPlayersElo(player1,player2, result)

  const new_players = players.map(player =>{
     if( player1.id === player.id) {return new_elos[0]}
     else if(player2.id === player.id){return new_elos[1]}
     else{return player}
  })
  return new_players
}


const MatchConfirmButton = ({setPlayers, players, player1, player2,result}) =>{

  return(<Button onClick={()=> {setPlayers(editPlayersMatch(players,player1,player2,result))}} ></Button>)

}

const calculateElo =(elo1, elo2, result) =>{
  const rating_change = K_VALUE*(1-expectedScore(elo1, elo2))
  if(result === 1)  {return [elo1+ rating_change,  elo2- rating_change]} //player 1 won
  else if(result === -1)  {return [elo1- rating_change, elo2 + rating_change] //player 1 lost
  }
}
const expectedScore = (elo1, elo2) =>{
  return 1/(1+10**((elo2-elo1)/400))

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

        <Display navigate={navigate} players={players} sortBy={sortBy} setSortBy={setSortBy}></Display>
      </div>

      <div id='sideBar'>
        <PlayerAddButton setPlayerform={setPlayerform} />
        <PlayerAddWindow playerForm={playerForm} players={players} setPlayers = {setPlayers}/>
        <MatchConfirmButton setPlayers={setPlayers} players={players} player1={players[0]} player2 ={players[1]} result={1}/>

      </div>
    </div>

  );
}

export default App;
