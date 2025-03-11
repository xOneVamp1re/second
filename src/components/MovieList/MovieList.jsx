'use client'

import { memo } from 'react'
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

const MemoizedMovieList = memo(MovieList, (prevProps, nextProps) => {
  return (
    prevProps.isRatedList === nextProps.isRatedList &&
    prevProps.moviesData.length === nextProps.moviesData.length &&
    prevProps.moviesData.every((movie, index) => movie.id === nextProps.moviesData[index].id)
  )
})

export default MemoizedMovieList
