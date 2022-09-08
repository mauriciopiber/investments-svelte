import path from "path";
import fs from "fs";

import { GoogleSpreadsheet } from "google-spreadsheet";
import type { SheetHeaders, SheetRow } from "../types";

const doc = new GoogleSpreadsheet(
  "1JhBm_o8T8c86Y5ICa6KK8I064a12ed1L6EamiTzaf9I"
);

const creds = fs.readFileSync(
  path.resolve("./config/credentials.json"),
  "utf-8"
);

export async function initWorksheet(): Promise<GoogleSpreadsheet> {
  await doc.useServiceAccountAuth(JSON.parse(creds));

  await doc.loadInfo(); // loads document properties and worksheets

  return doc;
}

export async function clearWorksheet(doc: GoogleSpreadsheet): Promise<void> {
  for (const sheetName in doc.sheetsByTitle) {
    if (sheetName === "Base") {
      continue;
    }
    const sheetToDelete = doc.sheetsByTitle[sheetName];
    await doc.deleteSheet(sheetToDelete.sheetId);
  }
}

export async function getRows<T>(
  sheetName: string,
  headers: SheetHeaders<T>[]
) {
  const doc = await initWorksheet();
  const sheet = doc.sheetsByTitle[sheetName];

  if (!sheet) {
    return [];
  }

  const rows = await sheet.getRows();

  return rows.map((row) => {
    return headers.reduce((newRow, header) => {
      return {
        ...newRow,
        [header.key as string]: row[header.title],
      };
    }, {});
  });
}

export async function writeSpreadsheet<T>(
  sheetName: string,
  headers: SheetHeaders<T>[],
  rows: Array<
    | {
        [header: string]: string | number | boolean;
      }
    | Array<string | number | boolean>
  >
) {
  const doc = await initWorksheet();

  const existingSheet = await doc.sheetsByTitle[sheetName];

  if (existingSheet) {
    await doc.deleteSheet(existingSheet.sheetId);
  }

  const sheet = await doc.addSheet({
    title: sheetName,
    headerValues: headers.map((header) => header.title) as string[],
  });

  await sheet.addRows(rows);

  await sheet.loadCells();

  for (const row in rows) {
    const rowIndex = parseInt(row) + 1;

    for (const header in headers) {
      const columnIndex = parseInt(header);

      const config = headers[columnIndex];

      const cell = await sheet.getCell(rowIndex, columnIndex);

      if (config.backgroundColor) {
        const { backgroundColor } = config;

        if ("red" in backgroundColor) {
          cell.backgroundColor = backgroundColor;
        } else {
          cell.backgroundColor = backgroundColor(rows[row] as SheetRow);
        }
      }

      if (config.wrapStrategy) {
        cell.wrapStrategy = config.wrapStrategy;
      }

      if (config.numberFormat) {
        cell.numberFormat = config.numberFormat;
      }
    }
  }

  await sheet.saveUpdatedCells();
}
