 import './App.css'
 import { useState } from 'react'

 const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}


const PersonTable = ({persons, setSortBy}) =>{

  persons.sort((a, b) => b.elo - a.elo)//sort by higher elo to calculate ranking
  {persons.map((person, index) => person.rank = index)}// add ranking


  return(

    <table>
      <tc>
        <tr><Button text = "#"/></tr>
      {persons.map((person, index) => <tr>{person.rank}</tr>)}
      </tc>
      <tc>
        <tr><Button text = "name"/></tr>
      {persons.map(person => <tr>{person.name}</tr>)}
      </tc>
      <tc>
      <tr><Button text = "W/L"/></tr>
      {persons.map(person => <tr>{person.wins} - {person.losses}</tr>)}
      </tc>
      <tc>
      <tr><Button text = "elo"/></tr>
      {persons.map(person => <tr> {person.elo}</tr>)}
      </tc>
    </table>
  )
}

function App() {
  const [sortBy, setSortBy] = useState('name') 

  const data = {
    persons: [
      {
        name: 'Captain Falakofalako',
        wins: 62,
        losses: 49,
        elo: 1240
      },
      {
        name: 'Carlos Magnussen',
        wins: 322,
        losses: 54,
        elo: 2844
      },
      {
        name: 'Dan Hibiki',
        wins: 12,
        losses: 86,
        elo: 840
      },
      {
        name: 'Hasko Curly',
        wins: 65,
        losses: 87,
        elo: 1336
      },
      {
        name: 'Sharoka',
        wins: 133,
        losses: 155,
        elo: 1234
      }
    ]
  }


  return (
    <div>
    <PersonTable persons = {data.persons} setSortBy={setSortBy}/>
    </div>
  );
}

export default App;
