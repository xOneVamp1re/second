'use client'

import PropTypes from 'prop-types'
import { format } from 'date-fns'

import getBorderColor from '../../utils/getBorderColor'

import CardInfoTagList from './CardInfoTagList'
import CardInfoRating from './CardInfoRating'
import styles from './MovieCard.module.css'

const CardInfo = ({ title, rating, ...props }) => {
  const { vote_average, overview, release_date, id, genre_ids, isRatedList } = props

  const formattedReleaseDate = (release_date) => {
    if (release_date) {
      const date = format(new Date(release_date), 'MMMM dd, yyyy')
      return date
    } else return 'Release date not'
  }
  const borderColor = isRatedList ? getBorderColor(rating) : getBorderColor(vote_average)

  return (
    <div className={styles['card-info']}>
      <div className={styles['card-info-title']}>
        <h5 className={styles['card-info-title-text']}>{title}</h5>
        <div className={`${styles['card-info-title-rating']} ${styles[borderColor]}`}>
          {isRatedList ? rating : vote_average.toFixed(1)}
        </div>
      </div>
      <p className={styles['card-info-realese-date']}>{formattedReleaseDate(release_date)}</p>
      <CardInfoTagList genre_ids={genre_ids} />
      <p className={styles['card-info-description']}>{overview.slice(0, 100)}</p>
      <CardInfoRating id={id} isRatedList={isRatedList} rating={rating} />
    </div>
  )
}
CardInfo.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  vote_average: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  isRatedList: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
}
export default CardInfo
