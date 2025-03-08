'use client'

import { Tag } from 'antd'
import PropTypes from 'prop-types'

import { useMyAppContext } from '../../context/AppContextProvider'

import styles from './MovieCard.module.css'

const CardInfoTagList = ({ genre_ids }) => {
  const { genres } = useMyAppContext()

  return (
    <div className={styles['card-info-tags']}>
      {genres
        .filter((genre) => genre_ids.includes(genre.id))
        .slice(0, 3)
        .map((el) => (
          <Tag key={el.id}>{el.name}</Tag>
        ))}
    </div>
  )
}

CardInfoTagList.propTypes = {
  genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default CardInfoTagList
