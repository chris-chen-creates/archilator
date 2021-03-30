import {
  Expression,
  Addition,
  Num,
  Multiplication,
  Subtraction,
  Division,
  Negative,
} from './Expression'
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
    if (expr instanceof Subtraction) {
      return this.evaluateSubtraction(expr)
    }
    if (expr instanceof Addition) {
      return this.evaluateAddition(expr)
    }
    if (expr instanceof Multiplication) {
      return this.evaluateMultiplication(expr)
    }
    if (expr instanceof Negative) {
      return this.evaluateNegative(expr)
    }
    if (expr instanceof Division) {
      return this.evaluateDivision(expr)
    }
    if (expr instanceof Num) {
      return expr.val
    }
    throw new InterpreterError(
      `Expression type not known ${expr.constructor.name}`
    )
  }

  evaluateSubtraction({ left, right }: Subtraction) {
    const leftVal = this.evaluate(left)
    const rightVal = this.evaluate(right)
    return leftVal - rightVal
  }

  evaluateNegative({ expr }: Negative) {
    const val = this.evaluate(expr) * -1
    return val
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

  evaluateDivision({ left, right }: Division) {
    const leftVal = this.evaluate(left)
    const rightVal = this.evaluate(right)
    return leftVal / rightVal
  }
}
