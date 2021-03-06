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

  constructor(
    public tokens: Token[],
  ) {}

  parse(): Expression {
    const expr = this.expression()
    return expr
  }

  // BEGIN GRAMMAR FUNCTIONS
  
  expression(): Expression {
    return this.multiplication()
  }

  addition(): Expression {
    let expression = this.negative()
    while (this.match(TokenType.PLUS)) {
      const right = this.negative()
      expression = new Addition(expression, right)
    }
    return expression
  }

  multiplication(): Expression {
    let expression = this.addition()

    if (this.match(TokenType.TIMES)) {
      const right = this.addition()
      expression = new Multiplication(expression, right)
    }

    return expression
  }

  negative(): Expression {
    if (this.match(TokenType.MINUS)) {
      return this.primary()
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
    throw(new ParserError("unexpected primary parse token ${peek().type}"))
  }

  num(): Num {
    return new Num(this.previous().literal)
  }

  group(): Expression {
      const expr = this.expression()
      this.consume(TokenType.RIGHT_PAREN)
      return expr
  }

  // END GRAMMAR FUNCTIONS

  match(ttype: TokenType): Boolean {
    if (this.check(ttype)) {
      return true
    }
    this.advance()
    return false
  }

  check(ttype: TokenType): Boolean {
    return this.peek().ttype === ttype
  }

  consume(ttype: TokenType) {
    this.advance()
  }

  peek(): Token {
    return this.tokens[this.index]
  }

  advance(): Token {
    this.index++
    return this.previous()
  }

  previous(): Token {
    return this.tokens[this.index]
  }

  isAtEnd(): boolean {
    return this.index >= this.tokens.length
  }
}
