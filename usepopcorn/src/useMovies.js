import { useEffect, useState } from 'react'
const KEY = 'ee3cc17a'
export function useMovies (query) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect( 
    function () {
       
      const controller = new AbortController()

      async function fetchData () {
        try {
          setIsLoading(true)
          setError('')
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          )

          const data = await res.json()
          if (!res.ok) {
            throw new Error('somethingError')
          }

          if (data.Response === 'False') {
            throw new Error('movie not found ')
          }

          setMovies(data.Search)
          setError('')
        } catch (error) {
          console.log(error)

          if (error.name !== 'AbortError') {
            setError(error.message)
          }
        } finally {
          setIsLoading(false)
        }
      }
      if (!query.length) {
        setMovies([])
        setError('')
        return
      }
    
      fetchData()

      return function () {
        controller.abort()
      }
    },
    [query]
  )

  return {
    movies , isLoading , error
  }
}
