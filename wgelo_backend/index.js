
const { request, response } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())


let persons = [

]

let games = [
 

]

app.get('/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.post('/persons', (request, response) => {
    
    const body = request.body


    if (!body.name) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = {
        name : body.name,
        elo : body.elo,
        wins: body.wins,
        losses: body.losses,
        id : new Date().valueOf()
  
    }
 


    persons = persons.concat(person)
  
    response.json(person)
  })



  app.put('/persons/:id', (request, response)=>{
    const body = request.body
    const id = Number(request.params.id)

    if(persons.some(element => element.id === id)){

    const person = {
      name : body.name,
      elo : body.elo,
      elo : body.elo,
      wins: body.wins,
      id : id //id in api link

  }
  persons = persons.map(element => element.id === person.id ? person : element )
  response.json(person)
    }else{
      return response.status(409).json({ 
        error: 'person not found' 
      })
    }
  })

  app.get('/games', (request, response) => {
    response.json(games)
  })

  app.post('/games', (request, response) => {
    const body = request.body
    
    const game = {
      player1: body.player1,
      player2: body.player2,
      result: body.result,
      date: body.date,
      id: new Date().valueOf()
    }

    games = games.concat(game)
    response.json(games)

  })

  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})