import { Command, Option } from "commander";
import { dividendsByWallet } from "./actions/dividends-by-wallet";
import { dividendsByGoal } from "./actions/dividends-by-goal";
import { dividendsBySector } from "./actions/dividends-by-sector";
import { updateProfile } from "./actions/profile";
import { parseCommandFilters } from "./commands/filters";

import { syncDb } from "./actions/sync-db";
import { syncWorksheet } from "./actions/sync-worksheet";
import log from "./utils/log";
import { syncCompanies } from "./actions/sync-companies";
import { syncSectors } from "./actions/sync-sector";
import type { StockFilters } from "./types";
import { syncSegments } from "./actions/sync-segments";
import { syncSubSectors } from "./actions/sync-sub-sectors";
import { syncTickets } from "./actions/sync-tickets";

const program = new Command();

const defaultRange = 6;
const defaultTarget = 1000;

const defaultFilters: StockFilters = [
  {
    type: "min",
    indicator: "marketValue",
    value: 200 * 1000000000,
  },
];

program
  .name("Stocks")
  .description("CLI to analyze stocks on Brazilian Market")
  .version("0.1.0");

program
  .command("wallet")
  .description("Get all dividends by wallet")
  .addOption(
    new Option(
      "-t, --target <value>",
      "Value of dividends you want to get from stock by month"
    ).default(defaultTarget)
  )
  // .option("-w, --wallet", "Use only tickets in wallet")
  .addOption(
    new Option(
      "-r, --range <value>",
      "Range in years to be used to calculate average dividends by year"
    ).default(defaultRange)
  )
  .action(async (options) => {
    const { range, target } = options;

    await dividendsByWallet(range, target);
  });

program
  .command("goal")
  .description("Get all dividends by Goal")
  .addOption(
    new Option(
      "-t, --target <value>",
      "Value of dividends you want to get from stock by month"
    ).default(defaultTarget)
  )
  .addOption(
    new Option(
      "-r, --range",
      "Range in years to be used to calculate average dividends by year"
    ).default(defaultRange)
  )
  .addOption(
    new Option(
      "-f, --filters <filter...>",
      "Filter @see DividendsFilter"
    ).default([])
  )

  .action(async (options) => {
    const { /*wallet,*/ filters, target, range } = options;

    const stocksFilter = await parseCommandFilters(filters);
    // const useWallet = wallet || false;

    await dividendsByGoal(stocksFilter, range, target);
  });

program
  .command("sector")
  .description("Get all dividends by Sector")
  .addOption(
    new Option(
      "-r, --range",
      "Range in years to be used to calculate average dividends by year"
    ).default(defaultRange)
  )
  .option("-f, --filters <filter...>", "Filter @see DividendsFilter")

  .action(async (options) => {
    const { /*wallet,*/ filters, /*target,*/ range } = options;

    const stocksFilter = await parseCommandFilters(filters);
    // const useWallet = wallet || false;

    await dividendsBySector(stocksFilter, range);
  });

program
  .command("profile")
  .description("Update profile sheet")
  .action(async () => {
    await updateProfile(defaultRange);
  });

program
  .command("sync:db")
  .description("Sync database with data from external sources")
  .option("-v, --verbose", "Show informations about execution")
  .action(async (options) => {
    const { verbose } = options;

    log.init(verbose);

    await syncDb();
    // Connection URL
  });

program
  .command("sync:companies")
  .description("Sync companies collection")
  .option("-v, --verbose", "Show informations about execution")
  .addOption(
    new Option(
      "-f, --filters <filter...>",
      "Filter @see DividendsFilter"
    ).default(defaultFilters)
  )
  .addOption(
    new Option(
      "-r, --range",
      "Range in years to be used to calculate average dividends by year"
    ).default(defaultRange)
  )
  .action(async (options) => {
    const { verbose, filters, range } = options;

    log.init(verbose);

    await syncCompanies(filters, range);
    // Connection URL
  });

program
  .command("sync:sectors")
  .description("Sync sectors collection")
  .option("-v, --verbose", "Show informations about execution")
  .addOption(
    new Option(
      "-f, --filters <filter...>",
      "Filter @see DividendsFilter"
    ).default(defaultFilters)
  )
  .addOption(
    new Option(
      "-r, --range",
      "Range in years to be used to calculate average dividends by year"
    ).default(defaultRange)
  )
  .action(async (options) => {
    const { verbose, filters, range } = options;

    log.init(verbose);

    await syncSectors(filters, range);
    // Connection URL
  });

program
  .command("sync:sub-sectors")
  .description("Sync sub sectors collection")
  .option("-v, --verbose", "Show informations about execution")
  .addOption(
    new Option(
      "-f, --filters <filter...>",
      "Filter @see DividendsFilter"
    ).default(defaultFilters)
  )
  .addOption(
    new Option(
      "-r, --range",
      "Range in years to be used to calculate average dividends by year"
    ).default(defaultRange)
  )
  .action(async (options) => {
    const { verbose, filters, range } = options;

    log.init(verbose);

    await syncSubSectors(filters, range);
    // Connection URL
  });

program
  .command("sync:segments")
  .description("Sync segments collection")
  .option("-v, --verbose", "Show informations about execution")
  .addOption(
    new Option(
      "-f, --filters <filter...>",
      "Filter @see DividendsFilter"
    ).default(defaultFilters)
  )
  .addOption(
    new Option(
      "-r, --range",
      "Range in years to be used to calculate average dividends by year"
    ).default(defaultRange)
  )
  .action(async (options) => {
    const { verbose, filters, range } = options;

    log.init(verbose);

    await syncSegments(filters, range);
    // Connection URL
  });

program
  .command("sync:tickets")
  .description("Sync tickets collection")
  .option("-v, --verbose", "Show informations about execution")
  .addOption(
    new Option(
      "-f, --filters <filter...>",
      "Filter @see DividendsFilter"
    ).default(defaultFilters)
  )
  .addOption(
    new Option(
      "-r, --range",
      "Range in years to be used to calculate average dividends by year"
    ).default(defaultRange)
  )
  .action(async (options) => {
    const { verbose, filters, range } = options;

    log.init(verbose);

    await syncTickets(filters, range);
    // Connection URL
  });

program
  .command("sync:worksheet")
  .description("Sync worksheet with data from database")
  .action(async () => {
    await syncWorksheet();
    // Connection URL
  });
program.parse(process.argv);
