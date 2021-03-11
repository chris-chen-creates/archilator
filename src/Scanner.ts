import { Token, TokenType } from './Token'

class ScannerError extends Error {}

export function scan(input: string): Token[] {
  return new Scanner(input).scanTokens()
}

export class Scanner {
  public index: number = 0

  constructor(public input: string) {}

  scanTokens(): Token[] {
    const tokens = []
    while (!this.isAtEnd()) {
      if (this.peek() == ' ') {
        this.advance()
        continue
      }
      const token = this.scanNext()
      if (token) {
        tokens.push(token)
      }
    }

    return tokens
  }

  scanNext(): Token {
    const char = this.advance()
    switch (char) {
      case '+':
        return {
          ttype: TokenType.PLUS,
          text: '+',
        }
        break
      case '-':
        return {
          ttype: TokenType.MINUS,
          text: '-',
        }
        break
      case '*':
        return {
          ttype: TokenType.TIMES,
          text: '*',
        }
        break
      case '/':
        return {
          ttype: TokenType.DIVIDE,
          text: '/',
        }
        break
      case '(':
        return {
          ttype: TokenType.LEFT_PAREN,
          text: '(',
        }
        break
      case ')':
        return {
          ttype: TokenType.RIGHT_PAREN,
          text: ')',
        }
        break
      case '^':
        return {
          ttype: TokenType.POW,
          text: '^',
        }
        break
      case '.':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        let numberstr = char
        while (!this.isAtEnd() && '.0123456789'.includes(this.peek())) {
          numberstr += this.advance()
        }
        return {
          ttype: TokenType.NUMBER,
          text: numberstr,
          literal: parseFloat(numberstr),
        }
        break
      default:
        throw new ScannerError(`scanNext: unexpected character: ${char}`)
        break
    }
  }

  isAtEnd(): boolean {
    if (this.index < 0) {
      throw new ScannerError(`index is negative and cannot be negative`)
    }
    return this.index >= this.input.length
  }

  advance(): string {
    if (this.index < this.input.length) {
      return this.input.charAt(this.index++)
    } else {
      throw new ScannerError('Input is at end')
    }
  }

  peek(): string {
    if (this.isAtEnd()) return ''
    return this.input.charAt(this.index)
  }
}
