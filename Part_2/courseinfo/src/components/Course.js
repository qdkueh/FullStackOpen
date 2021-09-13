import React from 'react';

const Course = ({ course }) => {
  return(
    <>
      <h1>Web Development Curriculum</h1>
      {course.map((course, i) => (
        <div key={i}>
          <Header name={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
      ))}
    </>
  )
}

const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Total = ({ parts }) => {
  /*const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises*/
  const totalExercise = parts.reduce((sum, parts) => sum + parts.exercises, 0)  
  return(
    <h4>Number of exercises {totalExercise}</h4>
  ) 
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => 
        <Part key={index} part={part} />  
      )}

    </div>
  )
}

export default Course
