const fetchSessionId = async () => {
  const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

  const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
  })
  const data = await response.json()
  if (data.success) {
    return data.guest_session_id
  } else {
    throw new Error(data.status_message)
  }
}

export default fetchSessionId
