
export enum TokenType {
	// Literal number type
	NUMBER,
	
	// Basic operators
	PLUS,
	MINUS,
	TIMES,
	DIVIDE,

	// Grouping
	LEFT_PAREN,
	RIGHT_PAREN,
	
	// Extra operations
	POW,
}

export interface Token {
	ttype: TokenType;
	text: string;
	literal?: any;
}
