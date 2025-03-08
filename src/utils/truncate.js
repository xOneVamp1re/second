const truncate = (text, title) => {
  if (title.length <= 20) {
    if (text.length > 200) {
      const newText = text.slice(0, 170).split(' ').slice(0, -2).join(' ')
      return newText[length - 1] !== ',' ? newText + '...' : newText.slice(0, -1) + '...'
    } else {
      return text
    }
  } else if (title.length > 20 && title.length <= 40) {
    if (text.length > 170) {
      const newText = text.slice(0, 140).split(' ').slice(0, -2).join(' ')
      return newText[length - 1] !== ',' ? newText + '...' : newText.slice(0, -1) + '...'
    } else {
      return text
    }
  }
}

export default truncate
