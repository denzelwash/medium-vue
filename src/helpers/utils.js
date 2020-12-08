export function range(start, end) {
  let arr = [...Array(end).keys()].map(i => i + start)
  return arr
}

export function date(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date))
}