'use client'

import useOnlineStatus from '../hooks/useOnlineStatus'
import MoviesApp from '../components/MoviesApp/MovieApp'

export default function Home() {
  const isOnline = useOnlineStatus()

  return isOnline ? (
    <MoviesApp />
  ) : (
    <p
      style={{
        margin: '0 auto',
        textAlign: 'center',
        fontSize: '1.5rem',
        marginTop: '2rem',
      }}>
      Вы оффлайн. Пожалуйста, проверьте ваше соединение.
    </p>
  )
}
