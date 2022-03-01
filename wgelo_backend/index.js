
const { request, response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())


let persons = [

    {
        id: 1,
        name: "Falako",
        elo: [1250, 1337 ,1340]
      },
      {
        id: 2,
        name: "Sharoka",
        elo: [1320]
      }
]

let games = [
    {
        player1:"Falako",
        player2: "Sharoka",
        result: 1
    }

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
        id : new Date().valueOf()
  
    }
 


    persons = persons.concat(person)
  
    response.json(person)
  })



  app.put('/persons/:id', (request, response)=>{
    const body = request.body
    const id = Number(request.params.id)

    const person = {
      name : body.name,
      elo : body.elo,
      id : id //id in api link

  }
  persons = persons.map(element => element.id === person.id ? person : element )
  response.json(person)

  })

  const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})