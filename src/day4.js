import { readFileSync } from 'node:fs'

const data = readFileSync('inputs/day4.txt', 'utf8')
const lines = data.trimEnd().split('\n')

function readNumbers(line) {
    let nums = []
    let i = 0
    while (i < line.length) {
        let char = line.charAt(i)
        let num = []
        while (Number.isInteger(parseInt(char))) {
            i++
            num += char
            char = line.charAt(i)
        }
        if (num.length != 0) {
            nums.push(parseInt(num))
            num = ''
        }
        else {
            i++
        }
    }
    return nums
}

const cards = []
lines.forEach((line) => {
    const parts = line.split(': ')[1].split(' | ')
    const card = readNumbers(parts[0])
    const myNumbers = readNumbers(parts[1])
    const matches = myNumbers.filter((n) => card.includes(n))
    let points = 0
    if (matches.length > 0) {
        points = 2**(matches.length - 1)
    }
    const result = { num: cards.length, card: card, matches: matches, points: points }
    cards.push(result)
})
console.log(cards)
console.log(cards.map((c) => c.points).reduce((p, c) => p + c, 0))
const cardsWithMore = cards.map((c) => {
    let more = []
    for (let i = 1; i <= c.matches.length; i++) {
        more.push(c.num + i)
    }
    c.more = more
    return c
})
console.log(cardsWithMore)
function sum(c) {
    let total = 0
    if (c.more.length > 0) {
        total += c.more.length
        c.more.forEach((m) => {
            total += sum(cards[m])
        })
    }
    return total
}
//const c = {more: [{ more: [{ more: []}, { more: [ { more: [] }] }] }, { more: [] }, { more: [{ more: [] }] }, { more: [] }]}
console.log(cards.map((c) => 1 + sum(c)).reduce((p, c) => p + c, 0))
//console.log(cardsWithMore.map((c) => 1 + c.more.length).reduce((p, c) => p + c, 0))
