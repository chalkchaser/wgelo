
//this util is for elo manipulation as well as calculation
//players is a list of player objects with variable list elo, of which last index element ist current elo
const K_VALUE =32



const calculateElo =(elo1, elo2, result) =>{
    const expected = expectedScore(elo1, elo2)

    if(result === 1)  {
        return [elo1+ K_VALUE* (1- expected),  elo2- K_VALUE* (1- expected)]} //player 1 won

    else if(result === -1)  {

        return [elo1- K_VALUE*(expected), elo2 + K_VALUE*(expected)] //player 2 won
    } 
}
  
  const expectedScore = (elo1, elo2) =>{
    return 1/(1+10**((elo2-elo1)/400))
  
  }

  const  matchPlayersElo= (player1, player2, result) => { // 1 equals win for player 1, 0 equals draw, -1 equals loss

    const new_elos = calculateElo(player1.elo.at(-1), player2.elo.at(-1), result)
    const new_player1 = player1
    const new_player2 = player2

    new_player1.elo = player1.elo.concat(new_elos[0])
    new_player2.elo = player2.elo.concat(new_elos[1])

  return [new_player1,new_player2]
}



export {matchPlayersElo}