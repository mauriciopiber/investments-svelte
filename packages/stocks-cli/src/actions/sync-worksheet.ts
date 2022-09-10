import { writeSpreadsheet } from "$utils/spreadsheet";
import type { Stock } from "@pibernetwork/stocks-model/src/types";
import type { SheetHeaders, SheetRow } from "src/types";
import mongoDbConnection from "@pibernetwork/stocks-model/src/utils/mongoDbConnection";

type SyncWorkspaceReport = Pick<Stock, "ticket">;

export async function syncWorksheet() {
  const { getInstance } = mongoDbConnection;
  const client = await getInstance();
  const db = client.db("investments");
  const collection = db.collection<Stock>("stocks");

  const storedStocks = await collection.find({}).toArray();

  await setSyncSpreadsheet("Sync", storedStocks);

  client.close();
}

async function setSyncSpreadsheet(
  sheetName: string,
  stocks: SyncWorkspaceReport[]
) {
  const headers: SheetHeaders<keyof SyncWorkspaceReport>[] = [
    {
      title: "Stock",
      key: "ticket",
      numberFormat: null,
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
  ];

  const rows: SheetRow[] = stocks.map((stock) => {
    const row: SheetRow = headers.reduce((row, header) => {
      const { title, key } = header;

      return {
        ...row,
        [title]: stock[key],
      };
    }, {});
    return row;
  });

  await writeSpreadsheet(sheetName, headers, rows);
}

// async function addStocks(
//   collection: Collection<FakeStock>,
//   stock: FakeStock[]
// ) {
//   await collection.insertMany(stock);
// }
