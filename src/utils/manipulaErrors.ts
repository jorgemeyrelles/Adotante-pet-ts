import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export class manipulaErrors extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ReqRuim extends manipulaErrors {
  constructor(message: string) {
    super(message, EnumHttpStatusCode.BAD_REQUEST);
  }
}

export class NotFound extends manipulaErrors {
  constructor(message: string) {
    super(message, EnumHttpStatusCode.NOT_FOUND);
  }
}