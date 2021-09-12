import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const randGen = () => {
    let rand = Math.floor(Math.random() * anecdotes.length)
    return rand
  }

  const randClick = () => {
    setSelected(randGen())
  }
 
  const voteClick = () => {
    const actVoteClicks = { 
      ...voted, 
      [selected]: voted[selected] + 1 
    }
    setVoted(actVoteClicks)
    console.log(actVoteClicks)

    console.log("actVoted selected: ", actVoteClicks[selected])

    if (actVoteClicks[selected] >= voted[mostVoted]) {
      setMostVoted(selected)
      console.log("most voted 2: ", voted[mostVoted])
    }

  }

  const [selected, setSelected] = useState(randGen())
  const [voted, setVoted] = useState({
    0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0
  })
  const [mostVoted, setMostVoted] = useState(0)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>"{anecdotes[selected]}"</p>
      <p>This anecdote has {voted[selected]} votes. </p>
      <Button handleClick={voteClick} text='Vote' />
      <Button handleClick={randClick} text='Next Anecdote' />
      <h2>Anecdotes with the most votes. </h2>
      <p>"{anecdotes[mostVoted]}"</p>
      <p>This anecdote has {voted[mostVoted]} votes. </p>
    </div>
  )
}

export default App