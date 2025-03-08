'use client'

import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, Input } from 'antd'

import debounce from '../../utils/debounce'

import style from './Header.module.css'

const Header = ({ onInputSubmit, activeTab, onTabChange }) => {
  const [value, setValue] = React.useState('')

  const handleTabClick = (tab) => {
    onTabChange(tab)
  }
  const debouncedSubmit = React.useMemo(() => {
    return debounce((value) => {
      onInputSubmit(value)
      setValue('')
    }, 1000)
  }, [onInputSubmit])

  const handleInputChange = (event) => {
    const newValue = event.target.value
    setValue(newValue)
    debouncedSubmit(newValue)
  }

  const items = [
    {
      key: 'search',
      label: 'search',
    },
    {
      key: 'rated',
      label: 'rated',
    },
  ]

  return (
    <header className={style.header}>
      <Tabs defaultActiveKey="1" centered size={'large'} items={items} onChange={handleTabClick} />
      {activeTab === 'search' && <Input placeholder="Type to search" value={value} onChange={handleInputChange} />}
    </header>
  )
}

Header.propTypes = {
  onInputSubmit: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
}

export default Header
