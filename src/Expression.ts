import { Token, TokenType } from './Token';

export class Expression {}

export class Binary extends Expression {
	constructor(
		public left: Expression,
		public op: Token,
		public right: Expression,
	) {
		super();
	}
}

export class Literal extends Expression {
	constructor(
		public value: any,
	) {
		super();
	}
}
