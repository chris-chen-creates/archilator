import { Expression, Binary, Literal } from './Expression';
import { Token, TokenType } from './Token';

export function parse(tokens: Token[]): Expression {
    return new Parser(tokens).parse();
}

class ParserError extends Error {};

export class Parser {
	public index: number = 0;

	constructor(
		public tokens: Token[],
	) {}

	parse(): Expression {
		if (this.tokens.length !== 3) {
			throw(new ParserError("Wrong token types"));
		}
		let [left, op, right] = this.tokens;
		return new Binary(
			new Literal(left.literal),
			op,
			new Literal(right.literal),
		);
	}

	term(): Expression {
		let expression = this.literal()
		if (this.match(TokenType.PLUS)) {
			const op = this.previous();
			const right = this.literal();
			expression = new Binary(expression, op, right);
		}
		return expression;
	}

	literal(): Expression {
		if (this.match(TokenType.NUMBER)) {
			return new Literal(this.previous().literal);
		}
		throw(new ParserError("Unexpected primary parse token ${peek().type}"));
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
