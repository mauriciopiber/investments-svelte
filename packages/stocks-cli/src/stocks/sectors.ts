import type {
  StocksMap,
  StructuredDividends,
  DividendsBySector,
  DividendsBySubSector,
  DividendsBySegment,
  DividendsByCompany,
  StockMapItem,
} from "src/types";

export function splitAndGroupDividends(
  stockDividends: StockMapItem[]
): StockMapItem[] {
  const structuredStocks = stockDividends.reduce(
    (structuredStocks: StocksMap, stock: StockMapItem) => {
      const { sector, subSector, segment, company } = stock;

      const stockSector = structuredStocks[sector] || {};

      const stockSubsector = stockSector[subSector] || {};

      const stockSegment = stockSubsector[segment] || {};

      const stockCompany = stockSegment[company] || [];

      stockCompany.push(stock);

      return {
        ...structuredStocks,
        [sector]: {
          ...stockSector,
          [subSector]: {
            ...stockSubsector,
            [segment]: {
              ...stockSegment,
              [company]: stockCompany,
            },
          },
        },
      };
    },
    {}
  );

  const structureDividends: StructuredDividends = Object.keys(
    structuredStocks
  ).map((sector) => {
    // init sectors map
    const subSectors = Object.keys(structuredStocks[sector]);

    const subSectorsDividends: DividendsBySubSector[] = subSectors.map(
      // init sub sector map

      (subSector): DividendsBySubSector => {
        const segments = Object.keys(structuredStocks[sector][subSector]);

        const segmentDividends: DividendsBySegment[] = segments.map(
          (segment): DividendsBySegment => {
            const companies = Object.keys(
              structuredStocks[sector][subSector][segment]
            );

            const companiesDividends: DividendsByCompany[] = companies.map(
              (company): DividendsByCompany => {
                // init segment map
                const stocks: StockMapItem[] =
                  structuredStocks[sector][subSector][segment][company];

                const dividendsAmount = stocks.reduce(
                  (amount, stock) => {
                    const { averageYield, averageValue } = stock;

                    return {
                      averageYield: amount.averageYield + averageYield,
                      averageValue: amount.averageValue + averageValue,
                    };
                  },
                  { averageYield: 0, averageValue: 0 }
                );

                // get averages for segment
                const { averageYield, averageValue } = dividendsAmount;

                const rateAverageYield = averageYield / stocks.length;
                const rateValue = averageValue / stocks.length;

                return {
                  name: company,
                  averageYield: rateAverageYield,
                  averageValue: rateValue,
                  stocks,
                };
              }
            );

            // get averages for sub sector

            const segmentYield = companiesDividends.reduce(
              (amount, segment) => segment.averageYield + amount,
              0
            );

            const segmentValue = companiesDividends.reduce(
              (amount, segment) => segment.averageValue + amount,
              0
            );

            const rateSegmentYield = segmentYield / companiesDividends.length;
            const rateSegmentValue = segmentValue / companiesDividends.length;

            return {
              name: segment,
              companies: companiesDividends,
              averageYield: rateSegmentYield,
              averageValue: rateSegmentValue,
            };
          }
        );

        // get averages for sub sector

        const subSectorYield = segmentDividends.reduce(
          (amount, segment) => segment.averageYield + amount,
          0
        );

        const subSectorValue = segmentDividends.reduce(
          (amount, segment) => segment.averageValue + amount,
          0
        );

        const rateSubSectorYield = subSectorYield / segmentDividends.length;
        const rateSubSectorValue = subSectorValue / segmentDividends.length;

        return {
          name: subSector,
          segments: segmentDividends,
          averageYield: rateSubSectorYield,
          averageValue: rateSubSectorValue,
        };
      }
    );

    // get averages for sector
    const subSectorYield = subSectorsDividends.reduce(
      (amount, segment) => segment.averageYield + amount,
      0
    );

    const subSectorValue = subSectorsDividends.reduce(
      (amount, segment) => segment.averageValue + amount,
      0
    );

    const rateSubSectorYield = subSectorYield / subSectorsDividends.length;
    const rateSubSectorValue = subSectorValue / subSectorsDividends.length;

    return {
      name: sector,
      subsectors: subSectorsDividends,
      averageYield: rateSubSectorYield,
      averageValue: rateSubSectorValue,
    };
  });

  const logs: StockMapItem[] = [];

  structureDividends.forEach((sectorDividends: DividendsBySector) => {
    const {
      name: sectorName,
      averageYield: sectorYield,
      averageValue: sectorValue,
      subsectors,
    } = sectorDividends;

    logs.push({
      company: "",
      sector: sectorName,
      subSector: "",
      segment: "",
      ticket: "",
      averageYield: sectorYield / 100,
      averageValue: sectorValue,
    });

    subsectors.forEach((subSectorDividends) => {
      const {
        name: subSectorName,
        averageYield: subSectorYield,
        averageValue: subSectorValue,
        segments,
      } = subSectorDividends;

      logs.push({
        company: "",
        sector: sectorName,
        subSector: subSectorName,
        segment: "",
        ticket: "",
        averageYield: subSectorYield / 100,
        averageValue: subSectorValue,
      });

      segments.forEach((segmentDividends) => {
        const {
          name: segmentName,
          averageYield: segmentYield,
          averageValue: segmentValue,
          companies,
        } = segmentDividends;

        logs.push({
          company: "",
          sector: sectorName,
          subSector: subSectorName,
          segment: segmentName,
          ticket: "",
          averageYield: segmentYield / 100,
          averageValue: segmentValue,
        });

        companies.forEach((companyDividends) => {
          const {
            name: companyName,
            averageYield: companyYield,
            averageValue: companyValue,
            stocks,
          } = companyDividends;

          logs.push({
            company: companyName,
            sector: sectorName,
            subSector: subSectorName,
            segment: segmentName,
            ticket: "",
            averageYield: companyYield / 100,
            averageValue: companyValue,
          });

          stocks.forEach((stock) => {
            const {
              ticket,
              averageValue: stockValue,
              averageYield: stockYield,
            } = stock;

            logs.push({
              company: companyName,
              sector: sectorName,
              subSector: subSectorName,
              segment: segmentName,
              ticket: ticket,
              averageYield: stockYield / 100,
              averageValue: stockValue,
            });
          });
        });
      });
    });
  });
  return logs;
}
