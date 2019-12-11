import React, {Component} from 'react'
import './App.css'

const LISTEMOTS = ["AVIATEUR", "ECRIVAIN", "DEVELOPPEUR", "DOCTEUR", "FOOTBALLER", "BOXEUR", "PROUT", "CAFE", "CIGARETTE"]
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


function LetterGuess({letterPhrase}) {
  return (
      <p className="divPhrase">{letterPhrase}</p>
  )
}

function BoutonLettre({value, onClick, etat, }) {
  return (
    <button value={value} disabled={etat} onClick={() => onClick(value)}>{value}</button>
  )
}

class App extends Component {

  initPhrase() {
    const mot = LISTEMOTS[Math.floor(Math.random()*LISTEMOTS.length)]
    return mot
  }

  state = {
    phrase: this.initPhrase(),
    usedLetters: new Set([]),
    guesses: 0,
    score:0,
  }

  // Produit la représentation textuel du MotMasque en fonction du cours de la partie
  // Chaque lettre non découverte est donc représentée par un underscore
  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
    (letter) => (usedLetters.has(letter) ? letter : '_')

  )
}

  handleLetterClick = value => {
    const {usedLetters, guesses, score, phrase} = this.state
    this.setState({usedLetters : usedLetters.add(value)})
    const newGuesses = guesses + 1
    this.setState({guesses : newGuesses})
    if (phrase.includes(value)) {
      let newScore = score + 2
      this.setState({score : newScore})
    } else if (!phrase.includes(value)) {
      let newScore = score - 1
      this.setState({score : newScore})
    }

    return
  }

  handleResetClick = () => {
    this.setState({phrase : this.initPhrase(), usedLetters : new Set([]), guesses: 0, score: 0})
    return
  }

  findResult() {
    const {phrase, usedLetters} = this.state
    let tabPhrase = phrase.split("")
    let result = [...usedLetters]

    let tabResult = tabPhrase.reduce((nice,letter) => {
      return result.indexOf(letter) > -1 ? [...nice,letter] : nice
    },[])

    if(tabResult.length === tabPhrase.length) {
      return true
    } else {
      return false
    }


  }

  render() {
    const {phrase, usedLetters, guesses, score} = this.state
    const won = this.findResult()

    return (
      <div className="feuille">
      <div className="pendu">
      <LetterGuess letterPhrase={this.computeDisplay(phrase, usedLetters)}/>

        <p className="divLettres">
          <span>{alphabet.split("").map((letterGuess,i) =>
          !won && <BoutonLettre key={i} value={letterGuess} onClick={this.handleLetterClick} etat={usedLetters.has(letterGuess)}/>
        )}</span>
        <span className="divLettres">{won && <button onClick={this.handleResetClick}>Recommencez !</button>}</span>
        </p>
      </div>

      <div className="results">
      <p className="essais">Nombre d'essais : {guesses}</p>
      {won && <p className="essais">Score final: {score}</p>}
      </div>

      </div>

    )

  }


}

export default App
