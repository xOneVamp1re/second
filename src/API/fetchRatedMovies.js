const fetchRatedMovies = async (sessionId, currentPage) => {
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
  }
  try {
    const response = await fetch(
      `${API_URL}/guest_session/${sessionId}/rated/movies?language=en-US&page=${currentPage}&sort_by=created_at.asc`,
      options
    )
    if (!response.ok) {
      const error = new Error('Network response was not ok')
      error.status = response.status
      throw error
    }
    const data = await response.json()

    return {
      data: data.results,
      page: data.page,
      totalResults: data.total_results,
      error: null,
    }
  } catch (error) {
    return { data: null, error: { message: error.message, status: error.status || null } }
  }
}

export default fetchRatedMovies
