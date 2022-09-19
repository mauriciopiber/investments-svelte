import type { StatusInvestDividends } from "src/types";

import type { PartialStock } from "src/types/stock";
import { decodeHTML } from "./decodeHTML";

import { STATUS_INVEST_URL } from "../constants";
import { parse, HTMLElement } from "node-html-parser";

import csvtojson from "csvtojson";
import path from "path";

import type { StatusInvestCsvStock } from "../types";
import { decodedNumber } from "./decodeNumber";
import { TICKER } from "../constants";

import type {
  StockDividends,
  StockSource,
} from "@pibernetwork/stocks-model/src/types";

export async function loadStocksFromSource(): Promise<StockSource[]> {
  const statusInvestStocks: PartialStock[] = await loadStatusInvestCSV();

  const stocksSource: StockSource[] = statusInvestStocks.map((partialStock) => {
    return {
      ticket: partialStock.ticket,
      url: `https://statusinvest.com.br/acoes/${partialStock.ticket}`,
    };
  });

  return stocksSource;
}

function preprocessStocks(stocks: StatusInvestCsvStock[]) {
  return stocks.map((csvStock) => {
    const stock: PartialStock = {
      ticket: csvStock[TICKER],
    };

    return stock;
  });
}

export async function loadStatusInvestCSV(): Promise<PartialStock[]> {
  const fileLocation = path.resolve(
    __dirname,
    "../",
    "statusinvest-busca-avancada.csv"
  );

  const stocksCsv = await csvtojson({
    delimiter: ";",
    flatKeys: true,
  }).fromFile(fileLocation);

  const stocks: PartialStock[] = preprocessStocks(stocksCsv);

  return stocks;
}

export async function parseSourceStock(
  initialStock: StockSource
): Promise<StockSource> {
  const { ticket } = initialStock;
  const parsedHTML: HTMLElement = await fetchTicketPage(ticket);

  // const currentPrice = parseCurrentPrice(parsedHTML, ticket);

  const sector = parseSector(parsedHTML);
  const subSector = parseSubsector(parsedHTML);
  const segment = parseSegment(parsedHTML);
  const company = ticket.substring(0, 4);

  const name = parseString(parsedHTML, ".company-description h4 span");
  const code = parseString(parsedHTML, ".company-description h4 small");

  return {
    ...initialStock,
    currentPrice: parseInfoCurrency(
      parsedHTML,
      "Valor atual",
      "h3",
      "div",
      ".value"
    ) as number,
    maxYear: parseInfoCurrency(
      parsedHTML,
      "Máx. 52 semanas",
      "h3",
      "div",
      ".value"
    ),
    minYear: parseInfoCurrency(
      parsedHTML,
      "Min. 52 semanas",
      "h3",
      "div",
      ".value"
    ),
    minMonth: parseInfoCurrency(
      parsedHTML,
      "Min. mês",
      "span",
      "div",
      ".sub-value"
    ),
    maxMonth: parseInfoCurrency(
      parsedHTML,
      "Máx. mês",
      "span",
      "div",
      ".sub-value"
    ),
    tagAlong: parseInfoRate(parsedHTML, "Tag Along", "span", ".info", ".value"),
    liquidezMediaDiaria: parseInfoCurrency(
      parsedHTML,
      "Liquidez média diária",
      "span",
      ".info",
      ".value"
    ),
    participacaoIbov: parseInfoRate(
      parsedHTML,
      "PARTICIPAÇÃO NO IBOV",
      "h3",
      "div",
      ".value"
    ),
    // valuation
    dividendsYield: parseInfoRate(parsedHTML, "D.Y", "h3", "div", ".value"),
    precoAtualPorLucroPorAcao: parseInfoCurrency(
      parsedHTML,
      "P/L",
      "h3",
      "div",
      ".value"
    ),
    pegRatio: parseInfoCurrency(parsedHTML, "PEG Ratio", "h3", "div", ".value"),
    precoAtualPorValorPatrimonialPorAcao: parseInfoCurrency(
      parsedHTML,
      "P/VP",
      "h3",
      "div",
      ".value"
    ),
    valorDeFirmaPorEBITDA: parseInfoCurrency(
      parsedHTML,
      "EV/EBITDA",
      "h3",
      "div",
      ".value"
    ),
    valorDeFirmaPorEBIT: parseInfoCurrency(
      parsedHTML,
      "EV/EBIT",
      "h3",
      "div",
      ".value"
    ),
    precoAtualPorEBITDA: parseInfoCurrency(
      parsedHTML,
      "P/EBITDA",
      "h3",
      "div",
      ".value"
    ),
    precoAtualPorEBIT: parseInfoCurrency(
      parsedHTML,
      "P/EBIT",
      "h3",
      "div",
      ".value"
    ),
    patrimonioLiquidoPorNumeroDeAcoes: parseInfoCurrency(
      parsedHTML,
      "VPA",
      "h3",
      "div",
      ".value"
    ),
    precoAtualPorAtivos: parseInfoCurrency(
      parsedHTML,
      "P/Ativo",
      "h3",
      "div",
      ".value"
    ),
    lucroLiquidoPorNumeroDeAcoes: parseInfoCurrency(
      parsedHTML,
      "LPA",
      "h3",
      "div",
      ".value"
    ),
    precoAtualPorReceitaLiquidaPorAcao: parseInfoCurrency(
      parsedHTML,
      "P/SR",
      "h3",
      "div",
      ".value"
    ),
    precoAtualPorAtivoCirculanteMenosPassivoCirculante: parseInfoCurrency(
      parsedHTML,
      "P/Cap. Giro",
      "h3",
      "div",
      ".value"
    ),
    precoAtualPorAtivosCirculanesLiquidosPorAcao: parseInfoCurrency(
      parsedHTML,
      "P/Ativo Circ. Liq.",
      "h3",
      "div",
      ".value"
    ),
    dividaLiquidaPorPatrimonioLiquido: parseInfoCurrency(
      parsedHTML,
      "Dív. líquida/PL",
      "h3",
      "div",
      ".value"
    ),
    dividaLiquidaPorEBITDA: parseInfoCurrency(
      parsedHTML,
      "Dív. líquida/EBITDA",
      "h3",
      "div",
      ".value"
    ),
    dividaLiquidaPorEBIT: parseInfoCurrency(
      parsedHTML,
      "Dív. líquida/EBIT",
      "h3",
      "div",
      ".value"
    ),
    patrimonioLiquidoPorAtivos: parseInfoCurrency(
      parsedHTML,
      "PL/Ativos",
      "h3",
      "div",
      ".value"
    ),
    passivosPorAtivos: parseInfoCurrency(
      parsedHTML,
      "Passivos/Ativos",
      "h3",
      "div",
      ".value"
    ),
    ativoCirculantePorPassivoCirculante: parseInfoCurrency(
      parsedHTML,
      "Liq. corrente",
      "h3",
      "div",
      ".value"
    ),
    lucroBrutoPorReceitaLiquida: parseInfoRate(
      parsedHTML,
      "M. Bruta",
      "h3",
      "div",
      ".value"
    ),
    EBITDAPorReceitaLiquida: parseInfoRate(
      parsedHTML,
      "M. EBITDA",
      "h3",
      "div",
      ".value"
    ),
    EBITPorReceitaLiquida: parseInfoRate(
      parsedHTML,
      "M. EBIT",
      "h3",
      "div",
      ".value"
    ),
    lucroLiquidoPorReceitaLiquida: parseInfoRate(
      parsedHTML,
      "M. Líquida",
      "h3",
      "div",
      ".value"
    ),
    lucroLiquidoPorPatrimonioLiquido: parseInfoRate(
      parsedHTML,
      "ROE",
      "h3",
      "div",
      ".value"
    ),
    lucroLiquidoPorAtivoTotal: parseInfoRate(
      parsedHTML,
      "ROA",
      "h3",
      "div",
      ".value"
    ),
    ebitMenosImpostosPorPatrimonioLiquidoMaisEndividamento: parseInfoRate(
      parsedHTML,
      "ROIC",
      "h3",
      "div",
      ".value"
    ),
    receitaLiquidaPorTotalMedioDeAtivos: parseInfoRate(
      parsedHTML,
      "Giro ativos",
      "h3",
      "div",
      ".value"
    ),
    compoundAnnualGrowthRateLucro5Anos: parseInfoRate(
      parsedHTML,
      "CAGR Receitas 5 anos",
      "h3",
      "div",
      ".value"
    ),
    compoundAnnualGrowthRateReceita5Anos: parseInfoRate(
      parsedHTML,
      "CAGR Lucros 5 anos",
      "h3",
      "div",
      ".value"
    ),
    patrimonioLiquido: parseInfoCurrency(
      parsedHTML,
      "Patrimônio líquido",
      "h3",
      "div",
      ".value"
    ),
    ativos: parseInfoCurrency(parsedHTML, "Ativos", "h3", "div", ".value"),
    ativoCirculante: parseInfoCurrency(
      parsedHTML,
      "Ativo circulante",
      "h3",
      "div",
      ".value"
    ),
    dividaBruta: parseInfoCurrency(
      parsedHTML,
      "Dívida bruta",
      "h3",
      "div",
      ".value"
    ),
    disponibilidade: parseInfoCurrency(
      parsedHTML,
      "Disponibilidade",
      "h3",
      "div",
      ".value"
    ),
    dividaLiquida: parseInfoCurrency(
      parsedHTML,
      "Dívida líquida",
      "h3",
      "div",
      ".value"
    ),
    valorDeMercado: parseInfoCurrency(
      parsedHTML,
      "Valor de mercado",
      "h3",
      "div",
      ".value"
    ),
    valorDeFirma: parseInfoCurrency(
      parsedHTML,
      "Valor de firma",
      "h3",
      "div",
      ".value"
    ),
    quantidadeDePapeis: parseInfoCurrency(
      parsedHTML,
      "Nº total de papéis",
      "span",
      "div",
      ".value"
    ),
    segmentoDeListagem: parseInfoText(
      parsedHTML,
      "Segmento de listagem",
      "h3",
      "div",
      ".value"
    ),
    freeFloat: parseInfoRate(parsedHTML, "Free Float", "h3", ".info", ".value"),
    investidores: parseInfoCurrency(
      parsedHTML,
      "Investidores",
      "span",
      "div",
      ".value"
    ),
    instituicional: parseInfoCurrency(
      parsedHTML,
      "Institucional",
      "span",
      "div",
      ".value"
    ),
    pessoaFisica: parseInfoCurrency(
      parsedHTML,
      "Pessoa física",
      "span",
      "div",
      ".value"
    ),
    pessoaJuridica: parseInfoCurrency(
      parsedHTML,
      "Pessoa jurídica",
      "span",
      "div",
      ".value"
    ),

    sector,
    subSector,
    segment,
    company,
    code,
    name,
    dividends: parseDividendsData(parsedHTML, initialStock.ticket),
  };
}

function parseString(pageHTML: HTMLElement, selector: string): string {
  const element: HTMLElement | null = pageHTML.querySelector(selector);

  if (!element || !element.textContent) {
    throw new Error(
      `Unexpected error: Unable to parse value to selector ${selector}`
    );
  }

  return element.textContent;
}

async function fetchTicketPage(ticket: string): Promise<HTMLElement> {
  const dividendsPage = await fetch(`${STATUS_INVEST_URL}/${ticket}`);
  const dividendsHTML = await dividendsPage.text();

  const parsedHTML: HTMLElement | null = parse(dividendsHTML);

  if (parsedHTML === null) {
    throw new Error(
      `Unexpected error: unable to parse page for ticket ${ticket}`
    );
  }

  return parsedHTML;
}

function parseDividendsData(
  pageHTML: HTMLElement,
  ticket: string
): StockDividends[] {
  const resultsInput: HTMLElement | null = pageHTML.querySelector("#results");

  if (resultsInput === null) {
    throw new Error(`Unable to find #results for ${ticket}`);
  }

  const investmentsInput = (
    resultsInput as unknown as HTMLInputElement
  ).getAttribute("value");

  if (investmentsInput === null) {
    throw new Error(`Unable to find #results values for ${ticket}`);
  }

  const decodedInput = decodeHTML(investmentsInput);
  const jsonInput: StatusInvestDividends[] = JSON.parse(decodedInput);

  return jsonInput.map((statusInvestDividend) => {
    return {
      paymentDate: statusInvestDividend.pd,
      value: statusInvestDividend.v,
      type: statusInvestDividend.etd,
    };
  });
}

function parseInfo(
  pageHTML: HTMLElement,
  title: string,
  titleSelector: string,
  parentSelector: string,
  targetSelector: string
) {
  const currentValueLabel = Array.from(
    pageHTML.querySelectorAll(titleSelector)
  ).find((el) => el.textContent === title);

  if (!currentValueLabel) {
    throw new Error(
      `Unexpected error: Unable to find element with title ${title}`
    );
  }

  const parentElement = currentValueLabel.closest(
    parentSelector
  ) as HTMLElement;

  if (!parentElement) {
    throw new Error(
      `Unexpected error: Unable to find parent element for ${title}`
    );
  }

  const targetElement = parentElement.querySelector(targetSelector);

  if (!targetElement) {
    throw new Error(
      `Unexpected error: Unable to find target element for ${title}`
    );
  }

  const currentValueString = targetElement.textContent;

  return currentValueString;
}

function parseInfoRate(
  pageHTML: HTMLElement,
  title: string,
  titleSelector: string,
  parentSelector: string,
  targetSelector: string
): number | null {
  const text = parseInfo(
    pageHTML,
    title,
    titleSelector,
    parentSelector,
    targetSelector
  );

  const formatText = text.replace("%", "").trim();
  if (formatText.trim() === "-" || formatText.trim() === "--") {
    return null;
  }

  const parsedNumber = decodedNumber(formatText);

  return parsedNumber;
}

function parseInfoText(
  pageHTML: HTMLElement,
  title: string,
  titleSelector: string,
  parentSelector: string,
  targetSelector: string
): string | null {
  const text = parseInfo(
    pageHTML,
    title,
    titleSelector,
    parentSelector,
    targetSelector
  );

  return text === "" ? null : text;
}

function parseInfoCurrency(
  pageHTML: HTMLElement,
  title: string,
  titleSelector: string,
  parentSelector: string,
  targetSelector: string
): number | null {
  const text = parseInfo(
    pageHTML,
    title,
    titleSelector,
    parentSelector,
    targetSelector
  );

  const formatText = text.replace("R$", "").trim();
  if (formatText === "-" || formatText === "--") {
    return null;
  }

  const currentNumber = decodedNumber(formatText);

  return currentNumber;
}

function getTextByLabel(
  pageHTML: HTMLElement,
  labelSelector: string,
  label: string,
  valueSelector: string
): string {
  const labelElement = Array.from(
    pageHTML.querySelectorAll(labelSelector)
  ).find((el) => el.textContent === label);

  if (!labelElement) {
    throw new Error(
      `Unexpected error: unable to find label selector for ${labelSelector} -> ${label}`
    );
  }

  const parentDivElement = labelElement.closest("div") as HTMLElement;

  if (!parentDivElement) {
    throw new Error(`Unexpected error: unable to find parent div`);
  }

  const valueElement = parentDivElement.querySelector(valueSelector);

  if (!valueElement || !valueElement.textContent) {
    throw new Error(
      `Unexpected error: unable to find element with value selector`
    );
  }
  return valueElement.textContent;
}

function parseSector(pageHTML: HTMLElement) {
  const sector = getTextByLabel(
    pageHTML,
    ".sub-value",
    "Setor de Atuação",
    ".value"
  );

  return sector;
}

function parseSubsector(pageHTML: HTMLElement) {
  const subSector = getTextByLabel(
    pageHTML,
    ".sub-value",
    "Subsetor de Atuação",
    ".value"
  );

  return subSector;
}

function parseSegment(pageHTML: HTMLElement) {
  const segment = getTextByLabel(
    pageHTML,
    ".sub-value",
    "Segmento de Atuação",
    ".value"
  );

  return segment;
}
