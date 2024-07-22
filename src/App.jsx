import { useState, useEffect } from 'react'
import './App.css'
import Menu from './Menu'
import Tenzies from './Tenzies/Tenzies'
import Quiz from './Quiz/Quiz'
import TicTacToe from './TicTacToe/TicTacToe'
import Test from './Test'

function App() {
  const [game, setGame] = useState('');


  function chooseGame(game) {
    setGame(game);
  }

  let content;
  if (game === '') {
    content = <Menu />
  } else if (game === 'tenzies') {
    content = <Tenzies />
  }

  return (
    <>
      <main>
        <TicTacToe />
      </main>
    </>
  )
}

export default App
