import React from 'react';

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
  
  export default PersonTable