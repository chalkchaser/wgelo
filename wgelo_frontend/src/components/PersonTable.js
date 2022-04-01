import React from 'react';
import { useState } from 'react';
import { LineChart, Line,XAxis, YAxis, ResponsiveContainer} from 'recharts';










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

    const data = selectedPerson.elo.map((value,index)=>({index,value}))
    const min = Math.floor((Math.min(...selectedPerson.elo))/100)*100
    const max = Math.ceil(Math.max(...selectedPerson.elo)/100)*100
    

    
    return(

    <div className="player-detail"><div>name: {selectedPerson.name}</div>
    <div>elo: {Math.round(selectedPerson.elo.at(-1))}</div>
    <div>wins: {selectedPerson.wins}</div>
    <div>losses: {selectedPerson.losses}</div>
    <div>rank: {selectedPerson.rank}</div>
    <button onClick={()=>setSelectedPerson(null)}>return</button>
      
    <ResponsiveContainer width="90%" aspect={3}>
      <LineChart className="chart "width={600} height={300} data={data} >
      <XAxis dataKey="index"/>
      <YAxis domain={[min, max]} type="number"
        tickFormatter={(value) => Math.round(value)}     
        />
        
      <Line  dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
    </div>
   
    
    )
  }
}
  
  export default PersonTable