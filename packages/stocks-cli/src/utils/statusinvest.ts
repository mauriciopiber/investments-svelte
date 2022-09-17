import type { StatusInvestDividends, StockPageData } from "src/types";

import type { StockDividends, StockFilters } from "src/types/stock";
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

import type {
  Stock,
  PartialStock,
  StockSource,
} from "@pibernetwork/stocks-model/src/types";
import { filterStocks } from "src/stocks/filters";
import log from "./../utils/log";

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

export async function loadStocks(filters: StockFilters): Promise<Stock[]> {
  log.writeLog("Stocks - Load CSV");
  const statusInvestStocks: PartialStock[] = await loadStatusInvestCSV();
  log.writeLog("Stocks - Filter");
  const filteredStocks = filterStocks(statusInvestStocks, filters);

  const stocks: Stock[] = [];

  log.writeLog("Stocks - Enrich");
  for (const stock of [...filteredStocks.slice(0, 2)]) {
    log.writeLog(`Stocks - Enrich - ${stock.ticket}`);
    const enrichedStock: Stock = await enrichStock(stock);
    stocks.push(enrichedStock);
  }
  log.writeLog("Stocks - Done");
  return stocks;
}

async function enrichStock(stock: PartialStock): Promise<Stock> {
  const { ticket } = stock;
  const stockPageData = await parseStockPage(ticket);

  const enrichedStock: Stock = {
    ...stock,
    ...stockPageData,
    indicators: {
      ...stock.indicators,
      ...stockPageData.indicators,
    },
  };
  return enrichedStock;
}

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
    ),
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

export async function parseStockPage(ticket: string): Promise<StockPageData> {
  const parsedHTML: HTMLElement = await fetchTicketPage(ticket);

  const dividendsList = parseDividendsData(parsedHTML, ticket);
  const price = parseCurrentPrice(parsedHTML, ticket);

  const sector = parseSector(parsedHTML);
  const subSector = parseSubsector(parsedHTML);
  const segment = parseSegment(parsedHTML);

  const vpa = parseVPA(parsedHTML);
  const lpa = parseLPA(parsedHTML);

  const company = ticket.substring(0, 4);

  const name = parseString(parsedHTML, ".company-description h4 span");
  const code = parseString(parsedHTML, ".company-description h4 small");

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
    code,
    name,
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

function parseVPA(pageHTML: HTMLElement): number {
  const sector = getTextByLabel(
    pageHTML,
    ".title.m-0.uppercase",
    "VPA",
    ".value"
  );

  return decodedNumber(sector);
}

function parseLPA(pageHTML: HTMLElement): number {
  const sector = getTextByLabel(
    pageHTML,
    ".title.m-0.uppercase",
    "LPA",
    ".value"
  );

  return decodedNumber(sector);
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

function parseCurrentPrice(pageHTML: HTMLElement, ticket: string): number {
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
