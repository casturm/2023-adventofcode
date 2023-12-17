import { readFileSync } from 'node:fs'

const data = readFileSync('inputs/day5.txt', 'utf8')
const lines = data.trimEnd().split('\n')

const seeds = []
const almanac = {}

function mapFromAlmanac(almanacNumbers) {
    const nums = almanacNumbers.split(' ')
    return {
        'destination range start': parseInt(nums[0]),
        'source range start': parseInt(nums[1]),
        'range length': parseInt(nums[2])
    }
}

let l = 0
while (l < lines.length) {
    let line = lines[l]
    if (l == 0) {
        let parts = line.split(':')
        parts[1].trim().split(' ').forEach((seed) => seeds.push(parseInt(seed)))
    }
    else { 
        if (line.indexOf(':') > 0) {
            let parts = line.split(':')
            l++
            line = lines[l]
            let maps = []
            while (line && line.trim().length > 0) {
                maps.push(mapFromAlmanac(line))
                l++
                line = lines[l]
            }
            almanac[parts[0]] = maps
        }
    }
    l++
}

function convert(source, map) {
    let destination = source
    almanac[map].forEach((range) => {
        if (source >= range['source range start'] && source < range['source range start'] + range['range length']) {
            destination = source + (range['destination range start'] - range['source range start'])
        }
    })
    return destination
}

function location(seed) {
    let soil = convert(seed, 'seed-to-soil map')
    let fertilizer = convert(soil, 'soil-to-fertilizer map')
    let water = convert(fertilizer, 'fertilizer-to-water map')
    let light = convert(water, 'water-to-light map')
    let temp = convert(light, 'light-to-temperature map')
    let humidity = convert(temp, 'temperature-to-humidity map')
    let location = convert(humidity, 'humidity-to-location map')
    return location
}

//console.log(almanac)
//console.log(convert(53, 'fertilizer-to-water map'))
//console.log(location(79))
//console.log(location(14))
//console.log(location(55))
//console.log(location(13))

console.log(seeds)
console.log(seeds.map((seed) => location(seed)))
function compareNumbers(a, b) {
  return a - b;
}
console.log(seeds.map((seed) => location(seed)).sort(compareNumbers))
console.log(seeds.map((seed) => location(seed)).sort(compareNumbers)[0])
