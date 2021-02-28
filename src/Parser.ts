import { Expression, Binary } from './Expression';
import { Token, TokenType } from './Token';

class ParserError extends Error {};

export class Parser {
	public index: number = 0;

	constructor(
		public tokens: Token[],
	) {}

	parse(): Expression {
		throw(new ParserError("parse: not implemented"));
	}

	term(): Expression {
		let expression = this.literal()
		if (this.match(TokenType.PLUS)) {
		}
		return expression;
	}

	literal(): Expression {
		throw(new ParserError("literal: not implemented"));
	}

	match(...ttypes: TokenType[]): Boolean {
		if (this.check(ttypes[0])) {
			this.advance();
			return true;
		}
		return false;
	}

	check(ttype: TokenType): Boolean {
		return this.peek().ttype === ttype;
	}

	peek(): Token {
		return this.tokens[this.index];
	}

	advance(): Token {
		this.index++;
		return this.previous();
	}

	previous(): Token {
		return this.tokens[this.index - 1];
	}
}
