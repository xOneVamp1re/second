'use client'

import PropTypes from 'prop-types'

import MovieCard from '../MovieCard/MovieCard'

import styles from './MovieList.module.css'

const MovieList = ({ moviesData, isRatedList }) => (
  <ul className={styles.movielist}>
    {moviesData.map((movie) => (
      <MovieCard key={movie.id} {...movie} isRatedList={isRatedList} />
    ))}
  </ul>
)

MovieList.propTypes = {
  moviesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  isRatedList: PropTypes.bool.isRequired,
}

export default MovieList
