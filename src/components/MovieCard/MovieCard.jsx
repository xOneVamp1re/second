'use client'

import PropTypes from 'prop-types'

import CardInfo from './CardInfo'
import styles from './MovieCard.module.css'

const MovieCard = ({ title, poster_path, ...props }) => {
  return (
    <li className={styles['list-item']}>
      <div className={styles['card']}>
        <img
          className={styles['card-img']}
          src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/notFound.jpg'}
          alt={`Изображение фильма ${title}`}
        />
        <CardInfo {...props} title={title} />
      </div>
    </li>
  )
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
}

export default MovieCard
