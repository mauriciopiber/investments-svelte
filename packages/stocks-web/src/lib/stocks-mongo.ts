import mongoDbConnection from '@/utils/mongoDbConnection';
import type { Stock } from '@global/types';

export async function getCollection() {
  const { getInstance } = mongoDbConnection;
  const client = await getInstance();
  const db = client.db('investments');
  const collection = db.collection<Stock>('stocks');
  return collection;
}

export async function getStocks(): Promise<Stock[]> {
  const collection = await getCollection();

  const storedStocks = await collection.find({}).toArray();

  const stocks = storedStocks.map((stock) => ({ ...stock, _id: null }));
  return stocks;
}

export async function getStock(ticket: string): Promise<Stock> {
  const collection = await getCollection();

  const storedStocks = await collection.findOne({ ticket });

  if (!storedStocks) {
    throw new Error('Unexpected error');
  }

  const { _id, ...stock } = storedStocks;

  return stock;
}

export async function getSectors(): Promise<string[]> {
  const collection = await getCollection();

  const storedStocks = await collection.find({}).toArray();

  const sectors: string[] = [...new Set(storedStocks.map((stock) => stock.sector))];
  return sectors;
}

export async function getCompanies(segmentName: string | null): Promise<string[]> {
  const collection = await getCollection();
  const filter = (segmentName && { segment: { $eq: segmentName } }) || {};
  const storedStocks = await collection.find(filter).toArray();

  const sectors: string[] = [...new Set(storedStocks.map((stock) => stock.company))];
  return sectors;
}

export async function getTickets(companyName: string | null): Promise<string[]> {
  const collection = await getCollection();
  const filter = (companyName && { company: { $eq: companyName } }) || {};
  const storedStocks = await collection.find(filter).toArray();

  const sectors: string[] = [...new Set(storedStocks.map((stock) => stock.ticket))];
  return sectors;
}

export async function getSubSectors(sectorName: string | null): Promise<string[]> {
  const collection = await getCollection();

  const filter = (sectorName && { sector: { $eq: sectorName } }) || {};

  const storedStocks = await collection.find(filter).toArray();

  const subSectors: string[] = [...new Set(storedStocks.map((stock) => stock.subSector))];
  return subSectors;
}

export async function getSegments(subSectorName: string | null): Promise<string[]> {
  const collection = await getCollection();
  const filter = (subSectorName && { subSector: { $eq: subSectorName } }) || {};
  const storedStocks = await collection.find(filter).toArray();

  const segments: string[] = [...new Set(storedStocks.map((stock) => stock.segment))];
  return segments;
}
