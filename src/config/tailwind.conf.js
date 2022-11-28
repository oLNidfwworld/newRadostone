const colorTheme = {
      'black':'var(--black)',
      'white':'var(--white)',
      'gray':'var(--gray)',
      'light-gray':'var(--light-gray)',
      'rad':'var(--rad)',
      'transparent':'var(--transparent)',
  }
  
  const spacingTheme = Array(31).fill(null)
    .reduce((acc, _, index) => ({ ...acc, ...{ [index]: `${(index) * 4}px` } }), {});
  
  module.exports = {
    colorTheme,
    spacingTheme,
  }