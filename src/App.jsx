import { useState, useEffect } from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import { useElapsedTime } from 'use-elapsed-time'

function App() {
  const [topScores, setTopScores] = useState(JSON.parse(localStorage.getItem('topScores')) || { seconds: '', rolls: '' });
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { elapsedTime, reset } = useElapsedTime({ isPlaying });

  useEffect(() => { 
    if (tenzies) {
      const finishedScores = { seconds: elapsedTime.toFixed(2), rolls: rolls };

      if (finishedScores.seconds < topScores.seconds || topScores.seconds === '' || topScores.seconds == 0.00) {
        setTopScores(prevTopScores => {
          localStorage.setItem('topScores' , JSON.stringify({...prevTopScores, seconds: finishedScores.seconds}))
          return {...prevTopScores, seconds: finishedScores.seconds}
        })
      }
  
      if (finishedScores.rolls < topScores.rolls || topScores.rolls === '' || topScores.rolls == 0) {
        setTopScores(prevTopScores => {
          localStorage.setItem('topScores' , JSON.stringify({...prevTopScores, rolls: finishedScores.rolls}))
          return {...prevTopScores, rolls: finishedScores.rolls}
        })
      }
  
      console.log('finished');
      console.log(finishedScores);
  
      console.log('top');
      console.log(topScores);
    }
  }, [tenzies]);

  useEffect(() => {
    const firstValue = dice[0].value;
    const sameValue = dice.every(die => die.value === firstValue);
    const allHeld = dice.every(die => die.isHeld);
    if (allHeld && sameValue) {
      setTenzies(true);
      setIsPlaying(false);
    }
  }, [dice])

  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(newDie());
    }

    return newDice;
  }

  function newDie() {
    return {
      id: nanoid(),
      isHeld: false,
      value: Math.ceil(Math.random() * 6)
    }
  }

  function roll() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => die.isHeld ? die : newDie()));
      setRolls(oldRolls => oldRolls + 1);
    } else {
      setDice(allNewDice());
      setTenzies(false);
      setRolls(0);
      reset();
    }
  }

  function holdDie(id) {
    setDice(oldDice => oldDice.map(die => die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    if (tenzies) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }

  const dieElements = dice.map(die => <Die die={die} key={die.id} hold={() => holdDie(die.id)} />)

  return (
    <>
      <main className='rounded-4 d-flex flex-column justify-content-around'>
        <h1 className='text-white text-center'>Tenzies</h1>

        <div className='d-flex justify-content-around text-white text-center'>
          <div>
            <h2 className='fs-3'>Top Score</h2>
            <p>seconds: {topScores.seconds && topScores?.seconds}</p>
            <p>rolls: {topScores.rolls && topScores?.rolls}</p>
          </div>
          <div>
            <h2 className='fs-3'>Your Score</h2>
            <p>seconds: <span>{elapsedTime.toFixed(2)}</span></p>
            <p>rolls: {rolls}</p>
          </div>
        </div>

        <div className='--dice-container'>
          {dieElements}
        </div>
        <button onClick={roll} className='--roll-btn btn btn-warning mx-auto px-4'>{tenzies ? 'New Game' : 'Roll'}</button>
      </main>
      {tenzies && <Confetti />}
    </>
  )
}

export default App
