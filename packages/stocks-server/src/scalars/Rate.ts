import {
  GraphQLScalarTypeConfig,
  GraphQLScalarType,
  GraphQLScalarSerializer,
} from "graphql";

import { Kind, ValueNode } from "graphql/language";

function generateRate(value: unknown): string {
  if (typeof value !== "number") {
    throw new TypeError(
      `Rate cannot represent non integer type ${JSON.stringify(value)}`
    );
  }

  const roundValue = (Math.round(value * 100) / 100).toFixed(2);

  const valueFormatted = `${roundValue
    .toString()
    .padStart(4, "0")
    .replace(".", ",")}%`;
  return valueFormatted;
}

function parseValue(value: unknown): number {
  return 0;
}

function parseLiteral(ast: ValueNode): number {
  return 0;
}

// function generateCents(value) {
//   const digits = value.replace("$", "").replace(",", "");
//   const number = parseFloat(digits, 10);
//   return number * 100;
// }

/**
 * An Currency Scalar.
 *
 * Input:
 *    This scalar takes a currency string as input and
 *    formats it to currency in cents.
 *
 * Output:
 *    This scalar serializes currency in cents to
 *    currency strings.
 */
const config: Readonly<GraphQLScalarTypeConfig<number, string>> = {
  name: "Rate",
  description: "A rate string",
  serialize: generateRate,
  parseValue,
  parseLiteral,
};

export default new GraphQLScalarType(config);
