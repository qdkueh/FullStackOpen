import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AddPerson = ({addName, newName, handleAddName, newPhone, handleAddPhone}) => {
  return (
    <form onSubmit={addName}>
      <div>Name: <input value={newName} onChange={handleAddName}/></div>
      <div>Number: <input value={newPhone} onChange={handleAddPhone}/></div>       
      <div><button type="submit">Add to book</button></div>
    </form>
  )
}

const ShowPerson = ({i, person}) => {
  return (
    <div key={i}>{person.name} {person.phone}</div>
  )
}

const Directory = ({persons, filterName, filterList}) => {
  return ( filterName 
  ? filterList.map((person, i) =>
  <ShowPerson key={i} person={person}/>)
  //<div key={i}>{person.name} {person.phone}</div>)
  : persons.map((person, i) =>
  <ShowPerson key={i} person={person}/>)
  //<div key={i}>{person.name} {person.phone}</div>)
  )
}

const Filter = ({filterName, handleFilterName}) => {
  return (
    <div>Name: <input value={filterName} onChange={handleFilterName}/></div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ filterList, setFilterList ] = useState(persons)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const personName = persons.map(person => person.name)
    const nameObject = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1
    }
    
    if (personName.indexOf(newName) > -1) {
      window.alert(`${newName} already exists`)
    } else {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewPhone('')
  }

  const handleAddName = (event) => {
    setNewName(event.target.value)
  }
  const handleAddPhone = (event) => {
    setNewPhone(event.target.value)
  }
  const handleFilterName = (event) => {
    setFilterName(event.target.value)
    setFilterList (persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Add a Contact</h2>
      <AddPerson addName={addName} newName={newName} handleAddName={handleAddName} newPhone={newPhone} handleAddPhone={handleAddPhone}/>

      <h2>Search Contact by Name</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName}/>
  
      <h2>Number Directory</h2>
      <Directory persons={persons} filterName={filterName} filterList={filterList} />

    </div>
  )
}

export default App
