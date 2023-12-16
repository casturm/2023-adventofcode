import { readFileSync } from 'node:fs'

const data = readFileSync('inputs/day1.txt', 'utf8')
const lines = data.trimEnd().split('\n')

let sum = 0
for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    let codeNums = line.match(/\d/g)
    let lastIndex = codeNums.length == 1 ? 0 : codeNums.length - 1
    let code = `${codeNums[0]}${codeNums[lastIndex]}`
    sum += parseInt(code)
}
console.log(sum)
