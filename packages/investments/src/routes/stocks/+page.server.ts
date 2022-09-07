import mongoDbConnection from './../../utils/mongoDbConnection';
import type { Stock } from '@global/types';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const { getInstance } = mongoDbConnection;
	const client = await getInstance();
	const db = client.db('investments');
	const collection = db.collection<Stock>('stocks');

	const storedStocks = await collection.find({}).toArray();

	console.log(storedStocks);
	return {
		title: 'New Svelte Kit 1!'
	};
}
