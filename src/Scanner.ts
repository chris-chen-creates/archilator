import { Token, TokenType } from './Token';

class ScannerError extends Error {};

function scan(input: string): Token[] {
	return new Scanner(input).scanTokens();
}

export class Scanner {
	public index: number = 0;

	constructor(
		public input: string,
	) {}

	scanTokens(): Token[] {
		const tokens = [];

		while (!this.isAtEnd()) {
			const token = this.scanNext();
			if (token) {
				tokens.push(token);
			}
		}

		return tokens;
	}

	scanNext(): Token {
		const char = this.advance();

		if (char === "+") {
			return {
				ttype: TokenType.PLUS,
				text: "+",
			};
		}
		throw(new ScannerError(`scanNext: unrecognized character ${char}`));
	}

	isAtEnd(): boolean {
		throw(new ScannerError("isAtEnd: not implemented"));
	}

	peek(): string {
		throw(new ScannerError("peek: not implemented"));
	}

	advance(): string {
		throw(new ScannerError("advance: not implemented"));
	}
}
