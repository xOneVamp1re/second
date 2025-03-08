'use client'

import { useEffect, useState } from 'react'
import { Pagination, Alert } from 'antd'
import PropTypes from 'prop-types'

import { useMyAppContext } from '../../context/AppContextProvider'
import { fetchMovies } from '../../API/fetchMovies'
import fetchRatedMovies from '../../API/fetchRatedMovies'
import checkForErrors from '../../utils/checkForErrors'
import Loader from '../Loader/Loader'
import MovieList from '../MovieList/MovieList'

const SearchList = ({ inputValue, activeTab }) => {
  const [moviesData, setMoviesData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const [totalPages, setTotalPages] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState(null)
  const [isRatedList] = useState(false)
  const { sessionId } = useMyAppContext()

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const moviesData = await fetchMovies(inputValue, currentPage)
        const ratedData = await fetchRatedMovies(sessionId)
        !moviesData.data && checkForErrors(moviesData.error)
        if (ratedData.data !== null) {
          const moviesArr = moviesData.data.map((movie) => {
            const rated = ratedData.data.find((rated) => rated.id === movie.id)
            return {
              ...movie,
              rating: rated ? rated.rating : 0.0,
            }
          })
          setMoviesData(moviesArr)
          setTotalPages(moviesData.totalPages)
        } else {
          setMoviesData(moviesData.data)
          setTotalPages(moviesData.totalPages)
        }
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
        setHasFetched(true)
      }
    }
    fetchData()
  }, [inputValue, currentPage, activeTab])
  return (
    <>
      {isLoading && inputValue ? (
        <Loader />
      ) : (
        <MovieList moviesData={moviesData} handleLoad={setIsLoading} isLoading={isLoading} isRatedList={isRatedList} />
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
      {hasFetched && moviesData.length === 0 && !error && inputValue && !isLoading && (
        <p
          style={{
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '1.5rem',
            marginTop: '2rem',
          }}>
          Увы, результатов по вашему запросу не найдено
        </p>
      )}
      {totalPages > 1 && !isLoading && (
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          align="center"
          total={totalPages}
          onChange={handlePageChange}
          style={{
            marginTop: '2rem',
          }}
        />
      )}
    </>
  )
}

SearchList.propTypes = {
  inputValue: PropTypes.string.isRequired,
  activeTab: PropTypes.string,
}

export default SearchList
