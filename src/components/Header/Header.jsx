'use client'

import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, Input, Alert } from 'antd'

import debounce from '../../utils/debounce'

import style from './Header.module.css'

const Header = ({ onInputSubmit, activeTab, onTabChange }) => {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState('')

  const handleTabClick = (tab) => {
    onTabChange(tab)
  }
  const debouncedSubmit = React.useMemo(() => {
    return debounce((value) => {
      onInputSubmit(value)
      setValue('')
    }, 1000)
  }, [onInputSubmit])

  const validateInput = (value) => {
    const trimmedValue = value.trim()
    if (!trimmedValue) {
      return 'Поле ввода не должно быть пустым'
    }
    return ''
  }
  const handleInputChange = (event) => {
    const newValue = event.target.value
    setValue(newValue)
    const validationError = validateInput(newValue)
    if (validationError) {
      setError(validationError)
    } else {
      setError('')
      debouncedSubmit(newValue)
    }
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
      {error && value && (
        <Alert
          message="Ошибка"
          description={error}
          type="error"
          showIcon
          style={{ margin: '0 auto', maxWidth: '500px', marginTop: '100px' }}
        />
      )}
    </header>
  )
}

Header.propTypes = {
  onInputSubmit: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
}

export default Header
