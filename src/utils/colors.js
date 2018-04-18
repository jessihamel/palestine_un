const paletteArray = [
  '#200633',
  '#8A075C',
  '#C74B36',
  '#E88124',
  '#F8C98E'
]

const getNullColor = () => {
  return '#c3bac0'
}
const getColorFromIndex = (index) => {
  return paletteArray[index % paletteArray.length]
}

export { getColorFromIndex, getNullColor }


// ['#505958',
// '#6da396',
// '#aebfa1',
// '#ced980',
// '#ed925d']

// '#065365',
// '#ECDBC7',
// '#DFAB3D',
// '#CC1156',
// '#ADCCC4'

// '#D93739',
// '#E78460',
// '#FAB02A',
// '#F9DE8A'
