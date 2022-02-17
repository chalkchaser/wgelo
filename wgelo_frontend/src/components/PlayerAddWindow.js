import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const PlayerAddWindow = ({ playerForm, setPlayers, players }) => {

    const [playerFormContent, setPlayerFromContent] = useState('')
  
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

  export default PlayerAddWindow