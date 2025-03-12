'use client'

import PropTypes from 'prop-types'
import { format } from 'date-fns'

import getBorderColor from '../../utils/getBorderColor'
import truncate from '../../utils/truncate'

import CardInfoTagList from './CardInfoTagList'
import CardInfoRating from './CardInfoRating'
import styles from './MovieCard.module.css'

const formatReleaseDate = (release_date) => {
  if (release_date) {
    const date = format(new Date(release_date), 'MMMM dd, yyyy')
    return date
  } else return 'Release date not'
}

const formatTitle = (title) => {
  return title.length > 40 ? title.slice(0, 40).slice(0, -6) + '...' : title
}

const MovieCard = ({ title, poster_path, ...props }) => {
  const { vote_average, overview, release_date, id, genre_ids, isRatedList } = props

  const borderColor = getBorderColor(vote_average)
  const truncatedTitle = formatTitle(title)
  const truncatedOverview = truncate(overview, truncatedTitle)

  return (
    <li className={styles['list-item']}>
      <div className={styles['card']}>
        <img
          className={styles['card-img']}
          src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/notFound.jpg'}
          alt={`Изображение фильма ${title}`}
        />
        <div className={styles['card-info-title']}>
          <h5 className={styles['card-info-title-text']}>{truncatedTitle}</h5>
          <div className={`${styles['card-info-title-rating']} ${styles[borderColor]}`}>{vote_average.toFixed(1)}</div>
        </div>
        <p className={styles['card-info-realese-date']}>{formatReleaseDate(release_date)}</p>
        <CardInfoTagList genre_ids={genre_ids} />
        <p className={styles['card-info-description']}>{truncatedOverview}</p>
        <CardInfoRating id={id} isRatedList={isRatedList} />
      </div>
    </li>
  )
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  id: PropTypes.number,
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  isRatedList: PropTypes.bool,
}

export default MovieCard
