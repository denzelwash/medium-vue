export function range(start, end) {
  let arr = [...Array(end).keys()].map(i => i + start)
  return arr
}
