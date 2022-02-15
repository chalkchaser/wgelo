import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


const K_VALUE =32



const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      <div className='buttonText'>{props.text}</div>
    </button>
  )
}


const PersonTable = ({ persons, sortBy, setSortBy }) => {

  persons.sort((a, b) => b.elo.at(-1) - a.elo.at(-1))//sort by higher elo to calculate ranking
  persons.map((person, index) => person.rank = index + 1)// add ranking
  persons.map((person) => person.percentage = person.wins / (person.wins + person.losses))// add ranking

  if (sortBy === 'elo') {
    //do nothing, since sort has already happened
  }

  if (sortBy === 'name') {
    persons.sort((a, b) => a.name.localeCompare(b.name))
    console.log("sort by name")
  }

  if (sortBy === 'percentage') {
    persons.sort((a, b) => b.percentage - a.percentage)
    console.log("sort by name")
  }

  return (

    <table id='personTable'>
      <thead>
        <tr>
          <td onClick={() => setSortBy('elo')}>#</td>
          <td onClick={() => setSortBy('name')}>name</td>
          <td onClick={() => setSortBy('percentage')}>W/L(%)</td>
          <td onClick={() => setSortBy('elo')}>elo</td>
        </tr>
      </thead>
      <tbody>
        {persons.map(person => <tr key={person.name}>
          <td>{person.rank}</td>
          <td>{person.name}</td>
          <td>{person.wins} - {person.losses}({(person.wins / (person.wins + person.losses)).toFixed(2)})</td>
          <td>{person.elo.at(-1)}</td>
        </tr>)}

      </tbody>
    </table>
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

  }
  else {
    return (<div></div>)
  }
}


const PlayerAddButton = ({ setPlayerform }) => {

  return (
    <Button text="+player" onClick={(() => setPlayerform(true))} ></Button>
  )
}



const PlayerAddWindow = ({ playerForm, setPlayers, players }) => {

  const [playerFormContent, setPlayerFromContent] = useState('asdads')

  const handlePlayerFormOnChange = (event) => {
    console.log(event.target.value)
    setPlayerFromContent(event.target.value)
  }

  const addCreatedPlayer  = (e) => {
    e.preventDefault()
    const playerObject = {
      name: playerFormContent,
      wins: 0,
      losses: 0,
      elo: [1200],
      id: parseInt(Math.random()*10000)
    }
    
    axios
    .post('http://localhost:3001/persons', playerObject)
    .then(response => {
      setPlayers(players.concat(response.data))
    })

  }

  if (playerForm) {
    return (
      <form id='submit_player' onSubmit={addCreatedPlayer}>
        <div>
          <input type="text" name="name" value={playerFormContent} onChange={handlePlayerFormOnChange} placeholder="name" />
        </div>
        <input type="submit" value="submit" />
      </form>
    )
  } else {
    return (<></>)
  }
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
  console.log(new_players)
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
