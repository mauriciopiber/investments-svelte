import log from "./utils/log";
import { Command, Option } from "commander";
import { dividendsByWallet } from "./actions/dividends-by-wallet";
import { dividendsByGoal } from "./actions/dividends-by-goal";
import { parseCommandFilters } from "./commands/filters";
import { syncCompanies } from "./actions/sync-companies";
import { syncSectors } from "./actions/sync-sector";
import { syncSegments } from "./actions/sync-segments";
import { syncSubSectors } from "./actions/sync-sub-sectors";
import { syncTickets } from "./actions/sync-tickets";
import { syncIncome } from "./actions/sync-income";
import { syncSource } from "./actions/sync-source";
import { dropDatabase } from "./actions/drop-database";
import { syncDatabase } from "./actions/sync-database";
import { syncPortfolio } from "./actions/sync-portfolio";
import dotenv from "dotenv";

dotenv.config();
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
  .command("sync:stocks")
  .description("Sync database with crawler data")
  .option("-v, --verbose", "Show informations about execution")

  .action(async (options) => {
    const { verbose } = options;

    log.init(verbose);

    await syncSource();
    // Connection URL
  });

program
  .command("sync:companies")
  .description("Sync companies collection")
  .option("-v, --verbose", "Show informations about execution")
  .action(async (options) => {
    const { verbose } = options;

    log.init(verbose);

    await syncCompanies();
  });

program
  .command("sync:sectors")
  .description("Sync sectors collection")
  .option("-v, --verbose", "Show informations about execution")

  .action(async (options) => {
    const { verbose } = options;

    log.init(verbose);

    await syncSectors();
  });

program
  .command("sync:sub-sectors")
  .description("Sync sub sectors collection")
  .option("-v, --verbose", "Show informations about execution")
  .action(async (options) => {
    const { verbose } = options;

    log.init(verbose);

    await syncSubSectors();
    // Connection URL
  });

program
  .command("sync:segments")
  .description("Sync segments collection")
  .option("-v, --verbose", "Show informations about execution")

  .action(async (options) => {
    const { verbose } = options;

    log.init(verbose);

    await syncSegments();
    // Connection URL
  });

program
  .command("sync:tickets")
  .description("Sync tickets collection")
  .option("-v, --verbose", "Show informations about execution")
  .addOption(
    new Option(
      "-r, --range",
      "Range in years to be used to calculate average dividends by year"
    ).default(defaultRange)
  )
  .action(async (options) => {
    const { verbose, range } = options;

    log.init(verbose);

    await syncTickets(range);
  });

program
  .command("sync:income")
  .description("Sync income collection")
  .option("-v, --verbose", "Show informations about execution")

  .action(async (options) => {
    const { verbose } = options;

    log.init(verbose);

    await syncIncome();
  });

program
  .command("sync:portfolio")
  .description("Sync portfolio collection")

  .action(async () => {
    await syncPortfolio();
  });

program
  .command("drop")
  .description("Drop all")
  .option("-s, --stocks", "Delete stocks")
  .action(async (options) => {
    await dropDatabase(options.stocks);
  });

program
  .command("sync:database")
  .description("Sync database")
  .action(async () => {
    await syncDatabase();
  });
program.parse(process.argv);
