const fetchGenres = async () => {
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

  const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
  })
  const data = await response.json()
  return data.genres
}

export default fetchGenres
