import { Command, Option } from "commander";
import { dividendsByWallet } from "./actions/dividends-by-wallet";
import { dividendsByGoal } from "./actions/dividends-by-goal";
import { dividendsBySector } from "./actions/dividends-by-sector";
import { updateProfile } from "./actions/profile";
import { parseCommandFilters } from "./commands/filters";

import { syncDb } from "./actions/sync-db";
import { syncWorksheet } from "./actions/sync-worksheet";
import log from "./utils/log";

const program = new Command();

const defaultRange = 6;
const defaultTarget = 1000;

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
  .command("sync:worksheet")
  .description("Sync worksheet with data from database")
  .action(async () => {
    await syncWorksheet();
    // Connection URL
  });
program.parse(process.argv);
