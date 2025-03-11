'use client'

import { Rate } from 'antd'
import { memo } from 'react'
import PropTypes from 'prop-types'

import { useMyAppContext } from '../../context/AppContextProvider'
import { ratingAction, ratingSelector } from '../../context/ratingReducer'

import styles from './MovieCard.module.css'

const CardInfoRating = ({ id, isRatedList }) => {
  const { sessionId, dispatch, ratingState } = useMyAppContext()
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

  const rating = ratingSelector(ratingState, id)

  const onRateChange = async (newRate) => {
    if (rating === newRate) {
      return
    }

    const url = `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${sessionId}`
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ value: newRate }),
    }
    await fetch(url, options)
    dispatch(ratingAction(id, newRate))
  }

  return (
    <Rate
      className={styles['card-info-rating-star']}
      style={{
        fontSize: '18px',
      }}
      value={rating}
      disabled={isRatedList ? 'disabled' : false}
      allowHalf
      count={10}
      onChange={onRateChange}
    />
  )
}

CardInfoRating.propTypes = {
  id: PropTypes.number.isRequired,
  isRatedList: PropTypes.bool.isRequired,
}

const MemoizedCardInfoRating = memo(CardInfoRating, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id && prevProps.isRatedList === nextProps.isRatedList
})

export default MemoizedCardInfoRating
