'use client'

import { createContext, useState, useReducer, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import fetchSessionId from '../API/fetchSessionId'
import fetchGenres from '../API/fetchGenres'

import { ratingReducer } from './ratingReducer'

const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const [genres, setGenres] = useState([])
  const [sessionId, setSessionId] = useState(null)
  const [ratingState, dispatch] = useReducer(ratingReducer, () => {
    const savedRatings = localStorage.getItem('movieRatings')
    return savedRatings ? JSON.parse(savedRatings) : {}
  })
  console.log(ratingState)

  useEffect(() => {
    const getGenres = async () => {
      const genresData = await fetchGenres()
      setGenres(genresData)
    }

    getGenres()

    const getSessionId = async () => {
      const newSessionId = await fetchSessionId()
      if (newSessionId) {
        localStorage.setItem('sessionID', newSessionId)
        setSessionId(newSessionId)
      } else {
        console.log('Error fetching session ID')
      }
    }
    getSessionId()
  }, [])

  return <AppContext.Provider value={{ genres, sessionId, ratingState, dispatch }}>{children}</AppContext.Provider>
}

const useMyAppContext = () => {
  return useContext(AppContext)
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { useMyAppContext, AppContextProvider }
