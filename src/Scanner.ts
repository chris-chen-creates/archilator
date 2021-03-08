import { Token, TokenType } from './Token'

class ScannerError extends Error {}

function scan(input: string): Token[] {
  return new Scanner(input).scanTokens()
}

export class Scanner {
  public index: number = 0

  constructor(public input: string) {}

  scanTokens(): Token[] {
    const tokens = []
    if (this.peek() == ' ') {
      this.advance()
    }

    while (!this.isAtEnd()) {
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
      case '0':
        return {
          ttype: TokenType.NUMBER,
          text: '0',
          literal: 0,
        }
        break
      case '1':
        return {
          ttype: TokenType.NUMBER,
          text: '1',
          literal: 1,
        }
        break
      case '2':
        return {
          ttype: TokenType.NUMBER,
          text: '2',
          literal: 2,
        }
        break
      case '3':
        return {
          ttype: TokenType.NUMBER,
          text: '3',
          literal: 3,
        }
        break
      case '4':
        return {
          ttype: TokenType.NUMBER,
          text: '4',
          literal: 4,
        }
        break
      case '5':
        return {
          ttype: TokenType.NUMBER,
          text: '5',
          literal: 5,
        }
        break
      case '6':
        return {
          ttype: TokenType.NUMBER,
          text: '6',
          literal: 6,
        }
        break
      case '7':
        return {
          ttype: TokenType.NUMBER,
          text: '7',
          literal: 7,
        }
        break
      case '8':
        return {
          ttype: TokenType.NUMBER,
          text: '8',
          literal: 8,
        }
        break
      case '9':
        return {
          ttype: TokenType.NUMBER,
          text: '9',
          literal: 9,
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
