import { Token, TokenType } from './Token'
import { Expression, Addition, Num, Multiplication } from './Expression'

import { scan } from './Scanner'
import { parse } from './Parser'

class InterpreterError extends Error {}

export class Interpreter {
  eval(input: string): any {
    const tokens = scan(input)
    const expr = parse(tokens)
    return this.evaluate(expr)
  }

  evaluate(expr: Expression): any {
    if (expr instanceof Addition) {
      return this.evaluateAddition(expr)
    }
    if (expr instanceof Multiplication) {
      return this.evaluateMultiplication(expr)
    }
    if (expr instanceof Num) {
      return expr.val
    }
    throw new InterpreterError(
      `Expression type not known ${expr.constructor.name}`
    )
  }

  evaluateAddition({ left, right }: Addition) {
    const leftVal = this.evaluate(left)
    const rightVal = this.evaluate(right)
    return leftVal + rightVal
  }

  evaluateMultiplication({ left, right }: Multiplication) {
    const leftVal = this.evaluate(left)
    const rightVal = this.evaluate(right)
    return leftVal * rightVal
  }
}
