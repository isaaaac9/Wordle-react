import './App.css';
import Board from './component/Board';
import Keyboard from './component/Keyboard'
import GameOver from './component/GameOver';
import {createContext, useEffect, useState} from 'react'
import {boardDefault, generateWordSet} from './word'

export const AppContext = createContext()

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisableLetters] = useState([])
  const [correctWord, setCorrectWord] = useState("")
  const [gameOver, setGameOver] = useState({
    gameOver: false, 
    guessedWord: false
  })


  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
      setCorrectWord(words.todayWord)
    })
  }, [])


  const onSelectLetter =(keyVal) => {
    if(currAttempt.letterPos > 4 ) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos +1 })
    
  }
  const onDel = (keyVal) => {
    if(currAttempt.letterPos === 0) return;
      const newBoard = [...board]
      newBoard[currAttempt.attempt][currAttempt.letterPos -1 ] = "" 
      setBoard(newBoard)
      setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos -1})

  }
  const onEnter = (keyVal) => {
    if(currAttempt.letterPos !== 5 ) return;

     let currWord = ""
     for(let i =0; i <5; i++) {
      currWord += board[currAttempt.attempt][i]
     }

     if(wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({attempt: currAttempt.attempt +1, letterPos: 0})
     }else {
      alert("Word not found")
     }

     if(currWord === correctWord){
      setGameOver({gameOver: true, guessedWord: true})
      return;
     }

     if(currAttempt.attempt === 5 ){
      setGameOver({gameOver: true, guessedWord: false})
     }
      
  }
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, currAttempt, 
        setCurrAttempt, onSelectLetter, onDel, 
        onEnter, correctWord, setDisableLetters, disabledLetters,
        setGameOver,gameOver}}>
        <div className='game'>
         <Board/>
         {gameOver.gameOver ? <GameOver/> : <Keyboard/> }
        </div>

      </AppContext.Provider>

    </div>
  );
  
}

export default App;
