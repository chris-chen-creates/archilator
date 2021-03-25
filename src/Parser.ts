import {
  Expression,
  Addition,
  Multiplication,
  Negative,
  Group,
  Num,
} from './Expression'
import { Token, TokenType } from './Token'

export function parse(tokens: Token[]): Expression {
  return new Parser(tokens).parse()
}

class ParserError extends Error {}

export class Parser {
  public index: number = 0

  constructor(public tokens: Token[]) {}

  parse(): Expression {
    const expr = this.expression()
    if (this.isAtEnd() == false) {
      throw new ParserError(
        `There are unparsed tokens still in the equation: ${this.expression()}`
      )
    }
    return expr
  }

  // BEGIN GRAMMAR FUNCTIONS
  /*
  GRAMMAR
expression      -> addition ;
addition        -> multiplication ( "+" multiplication )* ;
multipliciation -> negative ( "*" negative )* ;
negative        -> "-"? primary ;
primary         -> NUMBER | group ;
group           -> "(" expression ")" ;
  */

  expression(): Expression {
    return this.addition()
  }

  addition(): Expression {
    let expression = this.multiplication()
    while (this.match(TokenType.PLUS)) {
      const right = this.multiplication()
      expression = new Addition(expression, right)
    }
    return expression
  }

  multiplication(): Expression {
    let expression = this.negative()
    while (this.match(TokenType.TIMES)) {
      const right = this.negative()
      expression = new Multiplication(expression, right)
    }

    return expression
  }

  negative(): Expression {
    if (this.match(TokenType.MINUS)) {
      return new Negative(this.primary())
    } else {
      return this.primary()
    }
  }

  primary(): Expression {
    if (this.match(TokenType.LEFT_PAREN)) {
      return this.group()
    } else if (this.match(TokenType.NUMBER)) {
      return this.num()
    }
    throw new ParserError(`unexpected primary parse token ${this.peek().ttype}`)
  }

  num(): Num {
    return new Num(this.previous().literal)
  }

  group(): Expression {
    const expr = this.expression()
    this.consume(TokenType.RIGHT_PAREN)
    return new Group(expr)
  }

  // END GRAMMAR FUNCTIONS

  match(ttype: TokenType): Boolean {
    while (!this.isAtEnd()) {
      if (this.check(ttype)) {
        this.advance()
        return true
      }
      return false
    }
    return false
  }

  check(ttype: TokenType): Boolean {
    return this.peek().ttype === ttype
  }

  consume(ttype: TokenType) {
    while (!this.isAtEnd()) {
      if (this.check(ttype)) {
        return this.advance()
      }
      throw new ParserError('unexpected token')
    }
    throw new ParserError('unexpected end of input')
  }

  peek(): Token {
    return this.tokens[this.index]
  }

  advance(): Token {
    if (!this.isAtEnd()) this.index++
    return this.previous()
  }

  previous(): Token {
    if (this.index < 1) {
      throw new ParserError(
        'cannot retrieve previous before beginning of string'
      )
    }
    return this.tokens[this.index - 1]
  }

  isAtEnd(): boolean {
    return this.index >= this.tokens.length
  }
}
