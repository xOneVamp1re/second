import { useEffect, useState } from 'react'

import { useMyAppContext } from '../context/AppContextProvider'

const useSelector = (selector) => {
  const { ratingState } = useMyAppContext()
  console.log(ratingState)
  const [selectedState, setSelectedState] = useState(selector(ratingState))

  useEffect(() => {
    const newState = selector(ratingState)
    if (newState !== selectedState) {
      setSelectedState(newState)
    }
  }, [ratingState, selector, selectedState])

  return selectedState
}

export default useSelector
