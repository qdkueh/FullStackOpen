import React from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>Part: {props.parts.name} has {props.parts.exercises} number of exercises.</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part parts = {props.parts[0]} />
      <Part parts = {props.parts[1]} />
      <Part parts = {props.parts[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Total number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}

const App = () => { 
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />      
    </div>
  )
}

export default App