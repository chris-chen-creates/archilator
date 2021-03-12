import { Scanner } from '../Scanner'
import { TokenType } from '../Token'

const each = require('jest-each').default

test.each([
  ['', 0, true],
  ['a', 0, false],
  ['a', 1, true],
  ['a', 2, true],
  ['a bit longer input', 0, false],
  ['a bit longer input', 5, false],
  ['a bit longer input', 17, false],
  ['a bit longer input', 18, true],
  ['a bit longer input', 19, true],
  ['a bit longer input', 50, true],
])('isAtEnd basic test', (input: string, index: number, expected: boolean) => {
  const scanner = new Scanner(input)
  scanner.index = index
  expect(scanner.isAtEnd()).toEqual(expected)
})

test('isAtEnd negative index', () => {
  const scanner = new Scanner('')
  scanner.index = -1
  // Error text should contain: 'negative'
  expect(() => {
    scanner.isAtEnd()
  }).toThrow(/.*negative.*/)
})

test.each([
  ['abcde', 0, 'a'],
  ['abcde', 1, 'b'],
  ['abcde', 4, 'e'],
  ['ab de', 2, ' '],
])('advance basic test', (input, index, expected) => {
  const scanner = new Scanner(input)
  scanner.index = index
  expect(scanner.advance()).toEqual(expected)
})

test('advance moves index', () => {
  const scanner = new Scanner('abcde')
  expect(scanner.index).toEqual(0)
  scanner.advance()
  expect(scanner.index).toEqual(1)
})

test('advance throws error past end', () => {
  const scanner = new Scanner('abcde')
  scanner.index = 5
  // Error text should contain: 'negative"
  expect(() => {
    scanner.advance()
  }).toThrow(/.*at end.*/)
})

test.each([
  ['+', TokenType.PLUS],
  ['-', TokenType.MINUS],
  ['*', TokenType.TIMES],
  ['/', TokenType.DIVIDE],
  ['(', TokenType.LEFT_PAREN],
  [')', TokenType.RIGHT_PAREN],
  ['^', TokenType.POW],
  ['0', TokenType.NUMBER],
  ['1', TokenType.NUMBER],
  ['2', TokenType.NUMBER],
  ['3', TokenType.NUMBER],
  ['4', TokenType.NUMBER],
  ['5', TokenType.NUMBER],
  ['6', TokenType.NUMBER],
  ['7', TokenType.NUMBER],
  ['8', TokenType.NUMBER],
  ['9', TokenType.NUMBER],
])('scanNext simple characters', (input: string, ttype: TokenType) => {
  const token = new Scanner(input).scanNext()
  expect(token.ttype).toEqual(ttype)
})

test('scanNext properly handles numbers', () => {
  let token = new Scanner('0').scanNext()
  expect(token.literal).toEqual(0)
  token = new Scanner('9').scanNext()
  expect(token.literal).toEqual(9)
})

test('scanNext throws an error if it does not recognize the character', () => {
  const scanner = new Scanner('>')
  // Error text should contain: 'unexpected character"
  expect(() => {
    scanner.scanNext()
  }).toThrow(/.*unexpected character.*/)
})

test('scanTokens ignores spaces', () => {
  const tokens = new Scanner(' +').scanTokens()
  expect(tokens).toEqual([
    {
      ttype: TokenType.PLUS,
      text: '+',
    },
  ])
})

test('scanTokens ignores internal spaces', () => {
  const tokens = new Scanner('5+ 4').scanTokens()
  expect(tokens).toEqual([
    {
      ttype: TokenType.NUMBER,
      text: '5',
      literal: 5,
    },
    {
      ttype: TokenType.PLUS,
      text: '+',
    },
    {
      ttype: TokenType.NUMBER,
      text: '4',
      literal: 4,
    },
  ])
})

test('scanTokens handles multicharacter strings', () => {
  const tokens = new Scanner('10 + 18').scanTokens()
  expect(tokens).toEqual([
    {
      ttype: TokenType.NUMBER,
      text: '10',
      literal: 10,
    },
    {
      ttype: TokenType.PLUS,
      text: '+',
    },
    {
      ttype: TokenType.NUMBER,
      text: '18',
      literal: 18,
    },
  ])
})

test('scanTokens handles decimal numbers', () => {
  const tokens = new Scanner(' 10.8 + 2.4 ').scanTokens()
  expect(tokens).toEqual([
    {
      ttype: TokenType.NUMBER,
      text: '10.8',
      literal: 10.8,
    },
    {
      ttype: TokenType.PLUS,
      text: '+',
    },
    {
      ttype: TokenType.NUMBER,
      text: '2.4',
      literal: 2.4,
    },
  ])
})

test('scanTokens handles numbers leading decimals', () => {
  const tokens = new Scanner(' .25 + 4.75 ').scanTokens()
  expect(tokens).toEqual([
    {
      ttype: TokenType.NUMBER,
      text: '.25',
      literal: 0.25,
    },
    {
      ttype: TokenType.PLUS,
      text: '+',
    },
    {
      ttype: TokenType.NUMBER,
      text: '4.75',
      literal: 4.75,
    },
  ])
})

test('scanTokens handles multiple numbers leading decimals', () => {
  const tokens = new Scanner('.23 + .56').scanTokens()
  expect(tokens).toEqual([
    {
      ttype: TokenType.NUMBER,
      text: '.23',
      literal: 0.23,
    },
    {
      ttype: TokenType.PLUS,
      text: '+',
    },
    {
      ttype: TokenType.NUMBER,
      text: '.56',
      literal: 0.56,
    },
  ])
})
