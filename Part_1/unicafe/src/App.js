import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, value}) => {
  if(text==="Review") {
    return (
      <tr>
        <th>{text}</th>
        <th>{value}</th>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
    if(all.length === 0) {
      return (
        <p>No Feedback received yet.</p>
      )
    }
    return (
      <>
        <table>
          <StatisticsLine text="Review" value="Count"/>
          <StatisticsLine text="Good" value={good}/>
          <StatisticsLine text="Neutral" value={neutral}/>
          <StatisticsLine text="Bad" value={bad}/>
          <StatisticsLine text="All" value={all.length}/>
          <StatisticsLine text="Average" value={all.reduce((a, b)=> a + b, 0)/all.length}/>
          <StatisticsLine text="Positive" value={(good/(all.length) * 100) +"%" }/>
        </table>

      </>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])
  
  const goodClick = () => {
    setAll(all.concat(1))
    setGood(good + 1)
  }
  const neutralClick = () => {
    setAll(all.concat(0))
    setNeutral(neutral + 1)
  }
  const badClick = () => {
    setAll(all.concat(-1))
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
        <Button handleClick={goodClick} text='Good' />
        <Button handleClick={neutralClick} text='Neutral' />
        <Button handleClick={badClick} text='Bad' />
      <h1>Statistics</h1>
        <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all}/>
    </div>
  )
}

export default App