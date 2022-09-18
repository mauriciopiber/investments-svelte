import {
  GraphQLScalarTypeConfig,
  GraphQLScalarType,
  GraphQLScalarSerializer,
} from "graphql";

import { Kind, ValueNode } from "graphql/language";

function generateCurrency(value: unknown): string {
  if (typeof value !== "number") {
    throw new TypeError(
      `Currency cannot represent non integer type ${JSON.stringify(value)}`
    );
  }

  const formatConfig: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    currencyDisplay: "symbol",
  };

  const formattedValue = new Intl.NumberFormat("en-US", formatConfig)
    .format(value)
    .replace(/^(\D+)/, "$1 ");

  return formattedValue;
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
  name: "Currency",
  description: "A currency string",
  serialize: generateCurrency,
  parseValue,
  parseLiteral,
};

export default new GraphQLScalarType(config);
