const SET_RATING = 'SET_RATING'
const INITIAL_RATING = 0.0
const initialState = JSON.parse(localStorage.getItem('movieRatings') || '{}')

export const ratingAction = (movieId, rating) => ({
  type: SET_RATING,
  payload: { id: movieId, rating },
})

export const ratingSelector = (state = initialState, movieId) => {
  return state[movieId]?.rating ?? INITIAL_RATING
}

export const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RATING: {
      const { id, rating } = action.payload
      if (state[id]?.rating === rating) {
        return state
      }

      const newState = {
        ...state,
        [id]: { rating },
      }
      localStorage.setItem('movieRatings', JSON.stringify(newState))
      return newState
    }
    default:
      return state
  }
}
