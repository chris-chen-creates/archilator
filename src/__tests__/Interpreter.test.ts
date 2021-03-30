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
  const result = eval('4 + 4')
  expect(result).toEqual(8)
})

test('subtraction works correctly', () => {
  const result = eval('10 - 5')
  expect(result).toEqual(5)
})

test('multiplication works correctly', () => {
  const result = eval('8 * 9')
  expect(result).toEqual(72)
})

test('division works correctly', () => {
  const result = eval('48 / 12')
  expect(result).toEqual(4)
})

test('negative works correctly', () => {
  const result = eval('-5')
  expect(result).toEqual(-5)
})
