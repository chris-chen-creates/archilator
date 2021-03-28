import {
  Addition,
  Multiplication,
  Negative,
  Group,
  Num,
  Division,
} from '../Expression'
import { Parser, parse } from '../Parser'
import { scan } from '../Scanner'
import { TokenType } from '../Token'

test('previous retrieves the previous token', () => {
  const parser = new Parser(scan('1 + 2'))
  parser.index = 1
  expect(parser.previous()).toEqual({
    ttype: TokenType.NUMBER,
    text: '1',
    literal: 1,
  })
})

test('previous throws an error if at the beginning', () => {
  const parser = new Parser(scan('1 + 2'))
  expect(() => {
    parser.previous()
  }).toThrow(/.*cannot retrieve previous before beginning of string.*/)
})

test('match advances the index if the token matches', () => {
  const parser = new Parser(scan('1 + 2'))
  parser.index = 1
  parser.match(TokenType.PLUS)
  expect(parser.index).toBe(2)
})

test('match doesnt advance the index if the token doesnt match', () => {
  const parser = new Parser(scan('1 + 2'))
  parser.index = 1
  parser.match(TokenType.MINUS)
  expect(parser.index).toBe(1)
})

test('match doesnt do anything if at end', () => {
  const parser = new Parser(scan('1'))
  parser.index = 1
  parser.match(TokenType.PLUS)
  expect(parser.index).toBe(1)
})

test('consume checks the next token and if correct moves past it', () => {
  const parser = new Parser(scan('(1)'))
  parser.index = 2
  parser.consume(TokenType.RIGHT_PAREN)
  expect(parser.index).toEqual(3)
})

test('consume at the end of input with a good error', () => {
  const parser = new Parser(scan('(1)'))
  parser.index = 3
  expect(() => {
    parser.consume(TokenType.RIGHT_PAREN)
  }).toThrow(/.*unexpected end of input.*/)
})

test('consume fails on incorrect token', () => {
  const parser = new Parser(scan('(1+'))
  parser.index = 2
  expect(() => {
    parser.consume(TokenType.RIGHT_PAREN)
  }).toThrow(/.*unexpected token.*/)
})

test('parse is able to consume multiple of the same operation', () => {
  const parseTree = parse(scan('3 * 4 * 6'))
  expect(parseTree).toEqual(
    new Multiplication(new Multiplication(new Num(3), new Num(4)), new Num(6))
  )
})

test('parse handles negative numbers correctly', () => {
  const parseTree = parse(scan('-5'))
  expect(parseTree).toEqual(new Negative(new Num(5)))
})

test('parse uses the correct order of operations', () => {
  const parseTree = parse(scan('5 * 4 + 3'))
  expect(parseTree).toEqual(
    new Addition(new Multiplication(new Num(5), new Num(4)), new Num(3))
  )
})

test('parse group properly', () => {
  const parseTree = parse(scan('(5 + 4) * 3'))
  expect(parseTree).toEqual(
    new Multiplication(
      new Group(new Addition(new Num(5), new Num(4))),
      new Num(3)
    )
  )
})

test('parse handles division properly', () => {
  const parseTree = parse(scan('4 / 2 + 2'))
  expect(parseTree).toEqual(
    new Addition(new Division(new Num(4), new Num(2)), new Num(2))
  )
})

test('parse number test 2', () => {
  const parseTree = parse(scan('5 + 4 * 3'))
  expect(parseTree).toEqual(
    new Addition(new Num(5), new Multiplication(new Num(4), new Num(3)))
  )
})

test('parse number test 3', () => {
  const parseTree = parse(scan('5 + 4 * 3 + 8'))
  expect(parseTree).toEqual(
    new Addition(
      new Addition(new Num(5), new Multiplication(new Num(4), new Num(3))),
      new Num(8)
    )
  )
})

test('parse number test 4', () => {
  const parseTree = parse(scan('5 + 4 * 3 + 8 * 6'))
  expect(parseTree).toEqual(
    new Addition(
      new Addition(new Num(5), new Multiplication(new Num(4), new Num(3))),
      new Multiplication(new Num(8), new Num(6))
    )
  )
})

test('parse nested group properly', () => {
  const parseTree = parse(scan('((5 + 4) + 1) * 3'))
  expect(parseTree).toEqual(
    new Multiplication(
      new Group(
        new Addition(
          new Group(new Addition(new Num(5), new Num(4))),
          new Num(1)
        )
      ),
      new Num(3)
    )
  )
})

test('parse throws an error if there are unparsed tokens', () => {
  expect(() => {
    parse(scan('(3 + 4) 5'))
  }).toThrow(/.*unparsed tokens.*/)
})

test('is addition also valid multiplaction?', () => {
  let parser = new Parser(scan('5 + 4'))
  expect(() => {
    parser.multiplication()
  }).toThrow(/.*Addition is not valid multiplication.*/)
})

test('is multiplication also valid addition?', () => {
  let parser = new Parser(scan('5 * 4'))
})
