'use client'

import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import MovieCard from '../MovieCard/MovieCard'

import styles from './MovieList.module.css'

const MovieList = ({ moviesData, isRatedList }) => {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    setMovies(moviesData)
  }, [moviesData])

  return (
    <>
      <ul className={styles.movieList}>
        {movies.map((movie) => {
          return <MovieCard key={movie.id} {...movie} isRatedList={isRatedList} />
        })}
      </ul>
    </>
  )
}

MovieList.propTypes = {
  moviesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  isRatedList: PropTypes.bool.isRequired,
}

export default MovieList
