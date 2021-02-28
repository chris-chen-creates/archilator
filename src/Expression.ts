import { Token, TokenType } from './Token';

export class Expression {}

export class Binary extends Expression {
	constructor(
		public left: Expression,
		public operand: Token,
		public right: Expression,
	) {
		super();
	}
}
