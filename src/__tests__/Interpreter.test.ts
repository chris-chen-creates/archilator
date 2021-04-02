import {
  Addition,
  Multiplication,
  Negative,
  Group,
  Num,
  Division,
} from '../Expression'
import { Interpreter } from '../Interpreter'
import { parse } from '../Parser'
import { scan } from '../Scanner'

test('addition works correctly', () => {
  const result = new Interpreter().eval('4 + 4')
  expect(result).toEqual(8)
})

test('subtraction works correctly', () => {
  const result = new Interpreter().eval('10 - 5')
  expect(result).toEqual(5)
})

test('multiplication works correctly', () => {
  const result = new Interpreter().eval('8 * 9')
  expect(result).toEqual(72)
})

test('division works correctly', () => {
  const result = new Interpreter().eval('48 / 12')
  expect(result).toEqual(4)
})

test('negative works correctly', () => {
  const result = new Interpreter().eval('-5')
  expect(result).toEqual(-5)
})

test('grouping works correctly', () => {
  const result = new Interpreter().eval('(4 + 5) * 6 + 4 * 10 + (2 + 2)')
  expect(result).toEqual(98)
})

test('negative works correctly', () => {
  const result = new Interpreter().eval('-5')
  expect(result).toEqual(-5)
})

test('complex problem 1', () => {
  const result = new Interpreter().eval('5 + 4 * 3')
  expect(result).toEqual(17)
})

test('complex problem 2', () => {
  const result = new Interpreter().eval('(5 + 4) * 3')
  expect(result).toEqual(27)
})

test('complex problem 3', () => {
  const result = new Interpreter().eval('(5 + 4) * 3^2')
  expect(result).toEqual(81)
})

test('complex problem 4', () => {
  const result = new Interpreter().eval('(5 + 4) * 3^2 - 41')
  expect(result).toEqual(40)
})

test('complex problem 5', () => {
  const result = new Interpreter().eval('8 * 2^4 + (10 - 5)')
  expect(result).toEqual(133)
})

test('complex problem 6', () => {
  const result = new Interpreter().eval('-8 * 2^4 + (10 - 5)')
  expect(result).toEqual(-123)
})

test('complex problem 7', () => {
  const result = new Interpreter().eval('-8 * 2^4 + (10 / 2 - 5)')
  expect(result).toEqual(-128)
})

test('complex problem 8', () => {
  const result = new Interpreter().eval('-8 * 2^4 + (10 / 2 - 5) + 15 / 3')
  expect(result).toEqual(-123)
})

test('complex problem 9', () => {
  const result = new Interpreter().eval('25 / 5 + (-4 + 25) * 4^3')
  expect(result).toEqual(1349)
})

test('complex problem 10', () => {
  const result = new Interpreter().eval('25 / 5 + (-4 + 25) * 4^3 + (15 * -5)')
  expect(result).toEqual(1274)
})

test('exponent works correctly', () => {
  const result = new Interpreter().eval('2^3')
  expect(result).toEqual(8)
})
