import { useEffect, useState } from 'react'
import StarRating from './starRating'
import { useMovies } from './useMovies'

const KEY = 'ee3cc17a'
const average = arr =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

export default function App () {
  const [query, setQuery] = useState('')

  const [selectedId, setSelectedId] = useState(null)
  // const [watched, setWatched] = useState([])
  const [watched, setWatched] = useState(function(){
    const watchedStore  = localStorage.getItem('watched')
    return watchedStore ? JSON.parse(watchedStore) : []
  })


 const {movies , isLoading ,error} =  useMovies(query)

  function handleSelectMovie (id) {
    setSelectedId(selectedId => (id === selectedId ? null : id))
  }

  function handleCloseMovie () {
    setSelectedId(null)
  }

  function handleAddWatched (movie) {
    setWatched(watched => [...watched, movie])

   
 
  }

  function handleDeleteWatched (id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  useEffect(function(){
    localStorage.setItem('watched' , JSON.stringify(watched))
  } ,[watched])



  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMesg message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}

function Loader () {
  return <p className='loader'>loading...</p>
}

function ErrorMesg ({ message }) {
  return (
    <p className='error'>
      <span>❌</span>
      {message}
    </p>
  )
}

function NavBar ({ children }) {
  return <nav className='nav-bar'>{children}</nav>
}

function Logo () {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function Search ({ query, setQuery }) {
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  )
}

function NumResults ({ movies }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

function Main ({ children }) {
  return <main className='main'>{children}</main>
}

function Box ({ children }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen(open => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  )
}
function MovieList ({ movies, onSelectMovie }) {
  return (
    <ul className='list list-movies'>
      {movies?.map(movie => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  )
}

function Movie ({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function WatchedSummery ({ watched }) {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating))
  const avgUserRating = average(watched.map(movie => movie.userRating))
  const avgRuntime = average(watched.map(movie => movie.runtime))

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(0)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(0)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  )
}

function WatchedMovieList ({ watched, onDeleteWatched }) {
  return (
    <ul className='list'>
      {watched.map(movie => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  )
}

function WatchedMovie ({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className='btn-delete'
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  )
}

function MovieDetails ({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId)
  const watchUserRate = watched.find(
    movie => movie.imdbID === selectedId
  )?.userRating

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    realeased,
    Actors: actors,
    Director: director,
    Genre: genre
  } = movie

  function handleAdd () {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating
    }
    onAddWatched(newMovie)
    onCloseMovie()
  }

  useEffect(
    function () {
      function callBack (e) {
        if (e.key === 'Escape') {
          onCloseMovie()
        }
      }
      document.addEventListener('keydown', callBack)

      return function () {
        document.removeEventListener('keydown', callBack)
      }
    },
    [onCloseMovie]
  )

  useEffect(
    function () {
      async function getMovieDetails () {
        setIsLoading(true)
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        )
        const data = await res.json()
        setMovie(data)
        setIsLoading(false)
      }
      getMovieDetails()
    },
    [selectedId]
  )

  useEffect(
    function () {
      if (!title) return
      document.title = `Movie | ${title}`
      return function () {
        document.title = 'use PopCorn'
      }
    },
    [title]
  )

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {realeased} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>{imdbRating}</p>
            </div>
          </header>

          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You Rated Before {watchUserRate}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors} </p>
            <p>Director {director}</p>
          </section>
        </>
      )}
    </div>
  )
}
