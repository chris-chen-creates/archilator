import { Token, TokenType } from './Token';
import { Expression, Binary, Literal } from './Expression';

import { scan } from './Scanner';
import { parse } from './Parser';

class InterpreterError extends Error {};

export class Interpreter {
    eval(input: string): any {
        const tokens = scan(input);
        const expr = parse(tokens);
        return this.evaluate(expr);
    }

    evaluate(expr: Expression): any {
        if (expr instanceof Binary) {
            return this.evaluateBinary(expr);
        }
        if (expr instanceof Literal) {
            return expr.value;
        }
    }

    evaluateBinary({
        left,
        op,
        right,
    }: Binary) {
        const leftVal = this.evaluate(left);
        const rightVal = this.evaluate(right);
        if (op.ttype === TokenType.PLUS) {
            return leftVal + rightVal;
        }

        throw(new InterpreterError(`cannot perform binary operation for: ${op.ttype}`));
    }
}
