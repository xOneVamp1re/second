'use client'

import { useState, useEffect } from 'react'
import { Rate } from 'antd'
import PropTypes from 'prop-types'

import { useMyAppContext } from '../../context/AppContextProvider'

import styles from './MovieCard.module.css'

const CardInfoRating = ({ rating, id, isRatedList }) => {
  const { sessionId } = useMyAppContext()

  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN
  const [rate, setRated] = useState(rating)

  const onRateChange = (newRate) => {
    setRated(newRate)
  }

  useEffect(() => {
    const fetchSetRated = async (id) => {
      const url = `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${sessionId}`
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ value: rate }),
      }
      fetch(url, options)
    }

    if (rate !== rating) {
      fetchSetRated(id)
    }
  }, [rate])

  return (
    <Rate
      className={styles['card-info-rating-star']}
      style={{
        fontSize: '18px',
      }}
      value={rate}
      disabled={isRatedList ? 'disabled' : false}
      allowHalf
      count={10}
      onChange={onRateChange}
    />
  )
}

CardInfoRating.propTypes = {
  rating: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isRatedList: PropTypes.bool.isRequired,
}

export default CardInfoRating
