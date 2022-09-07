import type { StatusInvestDividends, StockPageData } from "src/types";

import type { StockDividends } from "src/types/stock";
import { decodeHTML } from "./decodeHTML";

import { STATUS_INVEST_URL } from "../constants";
import { parse, HTMLElement } from "node-html-parser";

import csvtojson from "csvtojson";
import path from "path";

import type { StatusInvestCsvStock } from "../types";
import { decodedNumber } from "./decodeNumber";
import {
  D_Y,
  TICKER,
  // PRECO,
  DIVIDA_LIQUIDA_EBIT,
  DIVIDA_LIQUIDA_PATRIMONIO,
  VALOR_DE_MERCADO,
  VPA,
  P_VP,
  PEG_RATIO,
  PASSIVOS_ATIVOS,
  PATRIMONIO_ATIVOS,
  PSR,
  P_ATIVOS,
  P_ATIVO_CIRCULANTE_LIQ,
  P_CAP_GIRO,
  P_EBIT,
  P_L,
  MARGEM_BRUTA,
  MARGEM_EBIT,
  MARGEM_LIQUIDA,
  CARG_LUCRO_5_ANOS,
  CARG_RECEITA_5_ANOS,
  EV_EBIT,
  ROA,
  ROE,
  ROIC,
  GIRO_ATIVOS,
  LIQUIDEZ_CORRENTE,
  // LIQUIDEZ_MEDIA_DIARIA,
  LPA,
} from "../constants";
import type { PartialStock } from "src/types/stock";

export const getObjectKeys = <T extends Record<string, unknown>>(
  object: T
): (keyof T)[] => Object.keys(object) as (keyof T)[];

function getCSVStockValue(
  csvStock: StatusInvestCsvStock,
  key: keyof StatusInvestCsvStock
) {
  return (csvStock[key] && decodedNumber(csvStock[key])) || 0;
}

function preprocessStocks(stocks: StatusInvestCsvStock[]) {
  return stocks.map((csvStock) => {
    const stock: PartialStock = {
      ticket: csvStock[TICKER],
      indicators: {
        // Valuation - Row 1
        dY: getCSVStockValue(csvStock, D_Y),
        pL: getCSVStockValue(csvStock, P_L),
        pegRatio: getCSVStockValue(csvStock, PEG_RATIO),
        pVp: getCSVStockValue(csvStock, P_VP),
        evEbitda: 0,
        evEbit: getCSVStockValue(csvStock, EV_EBIT),
        // Valuation - Row 2
        pEbitda: 0,
        pEbit: getCSVStockValue(csvStock, P_EBIT),
        vpa: getCSVStockValue(csvStock, VPA),
        pAssets: getCSVStockValue(csvStock, P_ATIVOS),
        lpa: getCSVStockValue(csvStock, LPA),
        pNetIncome: getCSVStockValue(csvStock, PSR),
        // Valuation - Row 3
        pWorkingCapital: getCSVStockValue(csvStock, P_CAP_GIRO),
        pNetCurrentAssets: getCSVStockValue(csvStock, P_ATIVO_CIRCULANTE_LIQ),
        // Debt
        netDebtEquity: getCSVStockValue(csvStock, DIVIDA_LIQUIDA_PATRIMONIO),
        netDebtEbitda: 0,
        netDebtEbit: getCSVStockValue(csvStock, DIVIDA_LIQUIDA_EBIT),
        equityAssets: getCSVStockValue(csvStock, PATRIMONIO_ATIVOS),
        liabilityAssets: getCSVStockValue(csvStock, PASSIVOS_ATIVOS),
        currentLiquidity: getCSVStockValue(csvStock, LIQUIDEZ_CORRENTE),
        // Efficience
        grossMargin: getCSVStockValue(csvStock, MARGEM_BRUTA),
        netMargin: getCSVStockValue(csvStock, MARGEM_LIQUIDA),
        ebitdaMargin: 0,
        ebitMargin: getCSVStockValue(csvStock, MARGEM_EBIT),
        // Rentability
        roe: getCSVStockValue(csvStock, ROE),
        roa: getCSVStockValue(csvStock, ROA),
        roic: getCSVStockValue(csvStock, ROIC),
        assetTurnover: getCSVStockValue(csvStock, GIRO_ATIVOS),
        // Grow
        cargRevenues: getCSVStockValue(csvStock, CARG_RECEITA_5_ANOS),
        cargProfit: getCSVStockValue(csvStock, CARG_LUCRO_5_ANOS),
        // General
        equityLiabilities: 0,
        marketValue: getCSVStockValue(csvStock, VALOR_DE_MERCADO),
      },
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

export async function parseStockPage(ticket: string): Promise<StockPageData> {
  const parsedHTML: HTMLElement = await fetchTicketPage(ticket);

  const dividendsList = parsePageDividendsData(parsedHTML, ticket);
  const price = parsePageCurrentPrice(parsedHTML, ticket);

  const sector = parsePageSector(parsedHTML);
  const subSector = parsePageSubsector(parsedHTML);
  const segment = parsePageSegment(parsedHTML);

  const vpa = parsePageVPA(parsedHTML);
  const lpa = parsePageLPA(parsedHTML);

  const company = ticket.replace(/[^a-zA-Z]/g, "");

  return {
    dividendsList,
    price,
    sector,
    subSector,
    segment,
    indicators: {
      vpa,
      lpa,
    },
    company,
  };
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

function parsePageVPA(pageHTML: HTMLElement): number {
  const sector = getTextByLabel(
    pageHTML,
    ".title.m-0.uppercase",
    "VPA",
    ".value"
  );

  return decodedNumber(sector);
}

function parsePageLPA(pageHTML: HTMLElement): number {
  const sector = getTextByLabel(
    pageHTML,
    ".title.m-0.uppercase",
    "LPA",
    ".value"
  );

  return decodedNumber(sector);
}

function parsePageDividendsData(
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
    };
  });
}

function parsePageCurrentPrice(pageHTML: HTMLElement, ticket: string): number {
  const currentValueLabel = Array.from(pageHTML.querySelectorAll("h3")).find(
    (el) => el.textContent === "Valor atual"
  );

  if (!currentValueLabel) {
    throw new Error(
      `Unexpected error: unable to find current value label for ${ticket}`
    );
  }

  const currentValueParentDiv = currentValueLabel.closest("div") as HTMLElement;

  if (!currentValueParentDiv) {
    throw new Error(
      `Unexpected error: unable to find current value parent div for ${ticket}`
    );
  }

  const currentValueElement = currentValueParentDiv.querySelector(".value");

  if (!currentValueElement) {
    throw new Error(
      `Unexpected error: unable to find current value element for ${ticket}`
    );
  }

  const currentValueString = currentValueElement.textContent;

  const currentValue = decodedNumber(currentValueString);

  return currentValue;
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

function parsePageSector(pageHTML: HTMLElement) {
  const sector = getTextByLabel(
    pageHTML,
    ".sub-value",
    "Setor de Atuação",
    ".value"
  );

  return sector;
}
function parsePageSubsector(pageHTML: HTMLElement) {
  const subSector = getTextByLabel(
    pageHTML,
    ".sub-value",
    "Subsetor de Atuação",
    ".value"
  );

  return subSector;
}

function parsePageSegment(pageHTML: HTMLElement) {
  const segment = getTextByLabel(
    pageHTML,
    ".sub-value",
    "Segmento de Atuação",
    ".value"
  );

  return segment;
}
