import { readFileSync } from 'node:fs'

const data = readFileSync('inputs/day3.txt', 'utf8')
const n = data.indexOf('\n')
const lines = data.trimEnd().split('\n')

function getRowFromIndex(n, i) {
  return Math.floor(i / n)
}

function getColFromIndex(n, i) {
  return i % n
}

function getAdjacentIndexes(n, i, j, l) {
  //console.log(`getAdjacentIndexes: ${n},${i},${j},${l}`)
  const indexes = []

  // Iterate over the neighborhood around the given (i, j) coordinates
  // taking the length of number into account
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= l; dj++) {
      const ni = i + di
      const nj = j + dj

      // Check if the neighboring coordinates are not on the number and within bounds
      if (!(di == 0 && dj >= 0 && dj < l) && ni >= 0 && ni < n && nj >= 0 && nj < n) {
        // Convert 2D coordinates to 1D index
        const index = ni * n + nj
        indexes.push(index)
      }
    }
  }

  //console.log(`getAdjacentIndexes ${indexes}`)
  return indexes
}

let parts = []
let gears = []

function readSchematic() {
  let numbers = []
  let index = 0
  let l = lines.length
  for (let row = 0; row < l; row++) {
    let line = lines[row]
    //console.log(line)
    while (index < n) {
      let char = line.charAt(index)
      //console.log(`${index} ${char}`)
      let num = []
      while (Number.isInteger(parseInt(char))) {
        index++
        num += char
        char = line.charAt(index)
      }
      if (num.length != 0) {
        //console.log(`number: ${num} (${index},${num.length})`)
        let nIndex = (row * n) + index - num.length
        let nIndicies = []
        for (let ni = nIndex; ni < nIndex + num.length; ni++) {
          nIndicies.push(ni)
        }
        let number = { number: parseInt(num), index: nIndex, indicies: nIndicies, adjacentSymbols: [] }
        getAdjacentIndexes(n, row, index - num.length, num.length).forEach((neighbor) => {
          let nRow = getRowFromIndex(n, neighbor)
          let nCol = getColFromIndex(n, neighbor)
          let nChar = lines[nRow].charAt(nCol)
          //console.log(`neighbor: ${neighbor}, char: ${nChar}`)
          if (nChar != '.') {
            number.adjacentSymbols.push(nChar)
          }
        })
        if (number.adjacentSymbols.length > 0) {
          parts.push(number)
        }
        numbers.push(number)
        num = ''
      }
      else {
        if (char == '*') {
          let adjacentIndexes = getAdjacentIndexes(n, row, index, 1)
          gears.push({ index: (row * n) + index, adjacentIndexes: adjacentIndexes })
        }
        index++
        char = line.charAt(index)
      } 
    }
    index = 0
  }
  return numbers
}

let numbers = readSchematic()
console.log(numbers)
console.log(parts)
console.log(parts.map((p) => p.number).reduce((p, c) => p + c, 0))
console.log(gears)
let gearsTouchingNumbers = gears.map((gear) => {
  gear.numbers = []
  numbers.forEach((number) => {
    if (number.indicies.some((i) => gear.adjacentIndexes.includes(i))) {
      gear.numbers.push(number.number)
    }
  })
  return gear
})
console.log(gearsTouchingNumbers)
let gearsTouchingOnlyTwoNumbers = gearsTouchingNumbers.filter((g) => g.numbers.length == 2)
console.log(gearsTouchingOnlyTwoNumbers)
let gearsTouchingOnlyTwoNumbersRatios = gearsTouchingOnlyTwoNumbers.map((g) => g.numbers.reduce((p, c) => p * c, 1))
console.log(gearsTouchingOnlyTwoNumbersRatios)
console.log(gearsTouchingOnlyTwoNumbersRatios.reduce((p, c) => p + c, 0))
