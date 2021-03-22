import { Token } from './Token'

export class Expression {}

export class Addition extends Expression {
  constructor(public left: Expression, public right: Expression) {
    super()
  }
}

export class Multiplication extends Expression {
  constructor(public left: Expression, public right: Expression) {
    super()
  }
}

export class Negative extends Expression {
  constructor(public expr: Expression) {
    super()
  }
}

export class Division extends Expression {
  constructor(public left: Expression, public right: Expression) {
    super()
  }
}

export class Group extends Expression {
  constructor(public expr: Expression) {
    super()
  }
}

export class Num extends Expression {
  constructor(public val: number) {
    super()
  }
}
