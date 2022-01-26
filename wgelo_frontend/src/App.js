 import './App.css'
 import { useState } from 'react'

 const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}


const PersonTable = ({persons, sortBy, setSortBy}) =>{

  persons.sort((a, b) => b.elo - a.elo)//sort by higher elo to calculate ranking
  {persons.map((person, index) => person.rank = index+1)}// add ranking
  {persons.map((person) => person.percentage = person.wins/(person.wins + person.losses))}// add ranking


  if(sortBy === 'elo'){
    //do nothing, since sort has already happened
  }

  if(sortBy === 'name'){
    persons.sort((a, b) => a.name.localeCompare(b.name))
    console.log("sort by name")
  }

  if(sortBy === 'percentage'){
    persons.sort((a, b) => a.name.localeCompare(b.name))
    console.log("sort by name")
  }

  return(

    <table>
    <thead><tr><td>#</td><td>name</td><td>W/L(%)</td><td>elo</td></tr>
</thead>
<tbody>
      {persons.map(person =><tr>
        <td>{person.ranking}</td>
        <td>{person.name}</td>
        <td>{person.wins} - {persons.losses}({(person.wins/(person.wins + person.losses)).toFixed(2)})</td>
        <td>{person.elo}</td>
        </tr>)}
    
</tbody>
</table>
  )
}

function App() {
  const [sortBy, setSortBy] = useState('elo') 

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
    <PersonTable persons = {data.persons} sortBy={sortBy} setSortBy={setSortBy}/>
    </div>
  );
}

export default App;
