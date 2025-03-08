'use client'

import { useState } from 'react'
import '@ant-design/v5-patch-for-react-19'

import Header from '../Header/Header'
import SearchList from '../SearchList/SearchList'
import RatedList from '../RatedList/RatedList'

// import styles from './MovieApp.module.css'

function moviesApp() {
  const [activeTab, setActiveTabs] = useState('search')
  const [inputValue, setInputValue] = useState('')

  return (
    <>
      <Header onInputSubmit={setInputValue} activeTab={activeTab} onTabChange={setActiveTabs} />
      {activeTab === 'search' && <SearchList inputValue={inputValue} activeTab={activeTab} />}
      {activeTab === 'rated' && <RatedList activeTab={activeTab} />}
    </>
  )
}

export default moviesApp
