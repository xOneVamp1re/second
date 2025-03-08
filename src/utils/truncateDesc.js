const truncate = (text, title) => {
  if (title.length <= 20) {
    return text.slice(0, 170) + '...'
  } else if (title.length > 20 && title.length <= 40) {
    return text.slice(0, 140) + '...'
  }

  return text
}

export default truncate
