import { useCities } from '../contexts/CitiesContext'
import CityItem from './CityItem'
import styles from './CityList.module.css'
import Message from './Message'
import Spinner from './Spinner'

export default function CityList ( ) {
  const {cities , loading} = useCities()
  if (loading) {
    return <Spinner/>
  }

  if(!cities.length){
    return <Message message='add your first city by clicking on a a city on the map '/>
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => <CityItem city={city} key={city.id}/> )}
    </ul>
  )
}
