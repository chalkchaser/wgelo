

function App() {
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
      }
    ]
  }


  return (
    <div>{data.persons[1].name}</div>
  );
}

export default App;
