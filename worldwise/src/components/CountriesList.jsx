import React from 'react'
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'

export default function CountriesList () {
  const {cities , loading} = useCities()

  if (loading) {
    return <Spinner />
  }

  if (!cities.length) {
    return (
      <Message message='add your first city by clicking on a a city on the map ' />
    )
  }

  const countries = cities.reduce((arr, city) => {

    if (!arr.map(el => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }]
    } else {
      return arr
    }
  }, [])
  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  )
}
