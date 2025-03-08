const getBorderColor = (rate) => {
  const colorRanges = {
    '#E90000': { min: 0, max: 3, class: 'border-red' },
    '#E97E00': { min: 3, max: 5, class: 'border-orange' },
    '#E9D100': { min: 5, max: 7, class: 'border-yellow' },
    '#66E900': { min: 7, max: 10, class: 'border-green' },
  }
  const getColorByValue = (value) => {
    for (const [, range] of Object.entries(colorRanges)) {
      if (value >= range.min && value <= range.max) {
        return range.class
      }
    }
  }
  return getColorByValue(rate)
}
export default getBorderColor
