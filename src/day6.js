import { readFileSync } from 'node:fs'

const data = readFileSyn/c('inputs/day6.txt', 'utf8')
const lines = data.trimEnd().split('\n')

let times = lines[0].split(':')[1].trim()
console.log(times)

let distances = lines[1].split(':')[1].trim()
console.log(distances)

let races = [{ time: 59, distance: 543 }, { time: 68, distance: 1020 }, { time: 82, distance: 1664 }, { time: 74, distance: 1022 }]
//let races = [{ time: 7, distance: 9 }, { time: 15, distance: 40 }, { time: 30, distance: 200 } ]

function distance(raceTime, holdTime) {
    return (-1 * (holdTime * holdTime)) + (holdTime * raceTime)
}

function allWaysToBeat(race) {
    let ways = []
    for (let i = 1; i < race.time; i++) {
        if (distance(race.time, i) > race.distance) {
            ways.push(i)
        }
    }
    return ways
}

function countWays(race) {
    return allWaysToBeat(race).length
}

function multiply(a, c) {
    return a * c
}

//console.log(distance(7, 2))
console.log(allWaysToBeat({ time: 7, distance: 9 }))
console.log(allWaysToBeat({ time: 15, distance: 40 }))
console.log(races.map(countWays).reduce(multiply))
console.log(countWays({ time: 71530, distance: 940200 }))
console.log(countWays({ time: 59688274, distance: 543102016641022 }))

