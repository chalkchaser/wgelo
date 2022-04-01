import React from 'react';
import { useState } from 'react';

const PersonTable = ({ persons, sortBy, setSortBy }) => {
    const [selectedPerson, setSelectedPerson] = useState()
    const [page, setPage] =useState(1)



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

    let numbers = [];
    for (let i = 1;  i-1 < persons.length/16; i++) {
      numbers.push(<button onClick={() =>{setPage(i)}}>{i}</button>);
    }
  
    if(!selectedPerson){
    return (
      <div id ="tableContainer">
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
          {persons.slice((page-1)*16,page*16).map(person => 
          <tr key={person.id} onClick={()=>setSelectedPerson(person)}>
            <td>{person.rank}</td>
            <td>{person.name}</td>
            <td>{person.wins} - {person.losses}({(person.wins / (person.wins + person.losses)).toFixed(2)})</td>
            <td>{Math.round(person.elo.at(-1))}</td>
          </tr>)}
  
        </tbody>
      </table>
      <div>{numbers}</div>
      </div>
    )
  }else{
    return(

    <div class="player-detail"><div>name: {selectedPerson.name}</div>
    <div>elo: {Math.round(selectedPerson.elo.at(-1))}</div>
    <div>wins: {selectedPerson.wins}</div>
    <div>losses: {selectedPerson.losses}</div>
    <div>rank: {selectedPerson.rank}</div>
    <button onClick={()=>setSelectedPerson(null)}>return</button>

    </div>

    
    )
  }
}
  
  export default PersonTable