import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const GoodButton = (props) => <button onClick={props.handleClick}> good </button>
const NeutralButton = (props) => <button onClick={props.handleClick}> neutral </button>
const BadButton = (props) => <button onClick={props.handleClick}> bad </button>

const Statistics = ({ good, neutral, bad }) => {

  if (good + neutral + bad === 0) return (<div><p>No feedback given </p></div>)
  
  //Taulukko
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
        <StatisticLine text="positive" value={((good) / (good + neutral + bad)) * 100 + '%'} />
      </tbody>
    </table>
  )
}

//taulukon rivit
const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    setGood(newValue)
  }
  const setToNeutral = newValue => {
    setNeutral(newValue)
  }
  const setToBad = newValue => {
    setBad(newValue)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <GoodButton handleClick={() => setToGood(good + 1)} />
      <NeutralButton handleClick={() => setToNeutral(neutral + 1)} />
      <BadButton handleClick={() => setToBad(bad + 1)} />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))