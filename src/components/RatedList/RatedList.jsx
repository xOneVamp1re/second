'use client'

import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Pagination, Alert } from 'antd'

import { useMyAppContext } from '../../context/AppContextProvider'
import fetchRatedMovies from '../../API/fetchRatedMovies'
import checkForErrors from '../../utils/checkForErrors'
import Loader from '../Loader/Loader'
import MovieList from '../MovieList/MovieList'

const RatedList = ({ activeTab }) => {
  const [ratedData, setRatedData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const [error, setError] = useState(null)
  const [isRatedList] = useState(true)
  const { sessionId } = useMyAppContext()

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    const fetchRated = async () => {
      try {
        setIsLoading(true)
        const ratedData = await fetchRatedMovies(sessionId)
        !ratedData.data && checkForErrors(ratedData.error)
        setRatedData(ratedData.data)
        setTotalPages(ratedData.totalPages)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
        setHasFetched(true)
      }
    }
    fetchRated()
  }, [currentPage, activeTab])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <MovieList moviesData={ratedData} handleLoad={setIsLoading} isLoading={isLoading} isRatedList={isRatedList} />
      )}
      {hasFetched && ratedData.length === 0 && !error && (
        <p
          style={{
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '1.5rem',
            marginTop: '2rem',
          }}>
          Увы, вы еще пока не оценили ни один фильм
        </p>
      )}
      {error && (
        <Alert
          message={error.message}
          description={error.info}
          type="error"
          showIcon
          style={{ margin: '0 auto', maxWidth: '500px', marginTop: '100px' }}
        />
      )}
      {totalPages > 1 && !isLoading && (
        <Pagination defaultCurrent={1} align="center" total={totalPages} onChange={handlePageChange} />
      )}
    </>
  )
}

RatedList.propTypes = {
  activeTab: PropTypes.string,
}

export default RatedList
