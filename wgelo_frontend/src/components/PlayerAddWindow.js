import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";



const baseUrl = ''

const PlayerAddWindow = ({ playerForm, setPlayers, players }) => {

    const [playerFormContent, setPlayerFromContent] = useState('')
    const {getAccessTokenSilently } = useAuth0();
  
    const handlePlayerFormOnChange = (event) => {
      console.log(event.target.value)
      setPlayerFromContent(event.target.value)
    }

    console.log("test")
  

    const addCreatedPlayer  = (e) => {
      e.preventDefault()
      const playerObject = {
        name: playerFormContent,
        wins: 0,
        losses: 0,
        elo: [1200],
      }

      if(players.filter(player => player.name === playerFormContent).length >=1){
        window.alert("player already exists")
        return
        
      }
    
      /* 
      axios
      .post(baseUrl + '/persons', playerObject)
      .then(response => {
        setPlayers(players.concat(response.data))
      })
      */
  
  
  
      const postPlayer = async () => {
        const domain = "chalkchaser.eu.auth0.com";

        

        try {
  
          const accessToken = await getAccessTokenSilently({
            audience: `https://wgelo/api`,
            scope: "openid",
          }
  
          
          )
          
          const options = { 
            method: "POST",
            url: "/persons",
            headers: { "authorization": "Bearer " + accessToken },
            data: playerObject
          };
        
        console.log("try to post player")

         axios(options)
        .then(response => {
          setPlayers(players.concat(response.data))
        })
  
        
    }    catch (e) {
      console.log(e.message);
    }
  
    }
  
    postPlayer()
  


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