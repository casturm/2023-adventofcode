import { readFileSync } from 'node:fs'

const data = readFileSync('inputs/day2.txt', 'utf8')
const lines = data.trimEnd().split('\n')

const colorOrZero = (color) => { return (color === undefined) ? 0 : parseInt(color) }
const isPossible = (color, limit) => colorOrZero(color) <= limit
const allPossible = (set) => { return (isPossible(set.red, 12) && isPossible(set.green, 13) && isPossible(set.blue, 14)) }

const countByColor = (sets, color) => { return sets.map((set) => colorOrZero(set[color])) }
const maxByColor = (sets, color) => {  return Math.max(...countByColor(sets, color)) }
const setFromString = (sets) =>  Object.fromEntries(sets.split(',').map((cube) => cube.split(' ').reverse()))

let possible = 0
let minCubesResults = []
lines.forEach((line) => {
  // console.log(line)
  const input = line.split(':')
  const id = parseInt(input[0].split(' ')[1])
  const games = input[1]
  const gameReveals = games.split(';')
  const minCubes = gameReveals.map((sets) => setFromString(sets))
  minCubesResults.push([maxByColor(minCubes, 'red'), maxByColor(minCubes, 'green'), maxByColor(minCubes, 'blue')])

  if (gameReveals.every((sets) => {
    let thisSet = setFromString(sets)
    return allPossible(thisSet)
  })) {
    possible += id
  }
})
//console.log(minCubesResults)
console.log(minCubesResults.map((m) => m.reduce((prev, curr) => prev * curr, 1)).reduce((p, c) => p + c, 0))
console.log(possible)
