/** @type {import('./$types').PageServerLoad} */

interface CryptoPrice {
  symbol: string;
  price: number;
}

interface CurrencyPrice {
  bid: number;
}

async function getCryptoPrice(symbol: string): Promise<CryptoPrice> {
  const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
  const data = await response.json();
  return data;
}

async function getDolarPrice(): Promise<CurrencyPrice> {
  const response = await fetch(`https://economia.awesomeapi.com.br/json/last/USD-BRL`);
  const data = await response.json();
  return data.USDBRL;
}

interface CryptoAsset {
  name: string;
  symbol: string;
  amount: number;
}

interface CryptoPortfolio {
  value: number;
}

export async function load() {
  const dolarPrice = await getDolarPrice();

  const cryptos: CryptoAsset[] = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.0130495,
    },
    {
      name: 'Etherium',
      symbol: 'ETH',
      amount: 0.1259182,
    },
    {
      name: 'Polygon',
      symbol: 'MATIC',
      amount: 100 + 68.79117543,
    },
    {
      name: 'Trust Wallet Token',
      symbol: 'TWT',
      amount: 31.6896502,
    },
    {
      name: 'Alpaca Finance',
      symbol: 'ALPACA',
      amount: 58.6,
    },
    {
      name: 'Aave',
      symbol: 'AAVE',
      amount: 0.16,
    },
    {
      name: 'Cardano',
      symbol: 'ADA',
      amount: 27.72271738,
    },
  ];

  const cryptoPortfolio: CryptoPortfolio[] = [];

  for (const crypto of cryptos) {
    const cryptoPrice = await getCryptoPrice(crypto.symbol);

    const cryptoValue = cryptoPrice.price * crypto.amount;

    cryptoPortfolio.push({
      ...crypto,
      value: cryptoValue * dolarPrice.bid,
    });
  }

  return {
    crypto: cryptoPortfolio,
  };
}
