'use client'

import { createContext, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import fetchSessionId from '../API/fetchSessionId'
import fetchGenres from '../API/fetchGenres'

const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const [genres, setGenres] = useState([])
  const [sessionId, setSessionId] = useState(null)

  useEffect(() => {
    const getGenres = async () => {
      const genresData = await fetchGenres()
      setGenres(genresData)
    }

    getGenres()
    const savedSessionId = localStorage.getItem('sessionID')

    const getSessionId = async () => {
      const newSessionId = await fetchSessionId()
      if (newSessionId) {
        localStorage.setItem('sessionID', newSessionId)
        setSessionId(newSessionId)
      } else {
        console.log('Error fetching session ID')
      }
    }

    savedSessionId ? setSessionId(savedSessionId) : getSessionId()
  }, [])

  return <AppContext.Provider value={{ genres, sessionId }}>{children}</AppContext.Provider>
}

const useMyAppContext = () => {
  return useContext(AppContext)
}
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
export { useMyAppContext, AppContextProvider }
