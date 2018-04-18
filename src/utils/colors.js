const paletteArray = [
  '#200633',
  '#8A075C',
  '#C74B36',
  '#E88124',
  '#c9bd8f',
  '#96b090'
  // '#E88124',
  // '#F8C98E'
]

const getColorFromIndex = (index) => {
  return paletteArray[index % paletteArray.length]
}

export { getColorFromIndex }
