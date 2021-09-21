import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filterName, handleFilterName}) => {
  return (
    <div>Name: <input value={filterName} onChange={handleFilterName}/></div>
  )
}

const ShowCountry = ({country}) => {
  return (
    <>
      <h2>{country.name}</h2>
      <div>
        Capital : {country.capital} <br/>
        Population : {country.population} <br/>
        Languages:  {country.languages.map((lang, i)=><li key={i}>{lang.name}</li>)} <br/>
        <img src={country.flag} width="25%" alt={country.name}/>
      </div>
      <Weather country = {country}/>
    </>
  )
}

const Directory = ({countries, filterName, filterList, setFilterList}) => {
  return ( 
    filterList.length >1 && filterList.length < 10 
      ? filterList.map((country, i) => 
        <div key={i}>
            {country.name}
            {console.log("does this country? ", country)}
            {console.log("does this wokr? ", filterList)}
            <button onClick={()=> {setFilterList([filterList[i]])}} >Show</button>
        </div>)
  : filterList.length === 1 ? filterList.map((country, i) =><ShowCountry key={i} country={country}/>)
  : filterList.length === 0 ? <p>No matches.</p>
  : <p>Too many matches, please be more specific.</p>
  )
}

const Weather = ({country}) => {
  const [ weather, setWeather ] = useState([])
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
  
  useEffect (() => {
    const weatherHook = () =>{
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${API_KEY}`)
      .then(res => {
        console.log('promise fulfilled for weather')
        setWeather(res.data)
        console.log("res data ", res.data)
      })
      .catch(err => console.log(err))
    }
    weatherHook()
  }, [API_KEY, country])
  
  console.log("weather", weather)
  //console.log("weather data from capital main", weather.main) //why error when put temp?
  //console.log("weather data from capital", weather.wind)
  return (
    <>
      {console.log("this is country: ", country.capital)}
      <h2>Weather in {country.capital}</h2>
      {console.log("typeof weathher ", weather.length)}
      {weather.length !== 0 
        ? <div>
            <img src ={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=""/> <br/>
            Temperature: {weather.main.temp} deg C <br/>
            Wind: {weather.wind.speed}
          </div>
        : <div>Loading... {console.log("Still loading.") } </div>
      }
    </>
  )
}

function App() {
  const [ countries, setCountries ] = useState([])
  const [ filterName, setFilterName ] = useState('')
  const [ filterList, setFilterList ] = useState(countries)
  

  const handleFilterName = (event) => {
    console.log("from here: ", event.target.value)
    setFilterName(event.target.value)
    setFilterList (countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  // const weatherHook = () =>{
  //    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`)
  //    .then(res => {
  //      setWeather(res.data)
  //    })
  //    .catch(err => console.log(err))
  // }
  // useEffect(weatherHook, [])
  return (
    <div>
      <h2>Find Countries</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName}/>
      <Directory countries={countries} filterName={filterName} filterList={filterList} setFilterList={setFilterList}/>
    </div>
  )
}

export default App;

