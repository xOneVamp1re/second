export const fetchMovies = async (inputValue, currentPage) => {
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const url = `${API_URL}/search/movie?query=${inputValue}&include_adult=false&language=en-US&page=${currentPage}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      const error = new Error('Network response was not ok')
      error.status = response.status
      throw error
    }
    const data = await response.json()
    return { data: data.results, totalPages: data.total_pages, error: null }
  } catch (error) {
    return { data: null, error: { message: error.message, status: error.status || null } }
  }
}
