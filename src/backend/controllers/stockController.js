import Stock from '../models/Stock.js';

const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.findAll();
    res.status(200).json(stocks);
  } catch (error) {
    console.error('Error in getStocks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getStockBySymbol = async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const stock = await Stock.findOne({ where: { symbol } });

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    res.status(200).json(stock);
  } catch (error) {
    console.error('Error in getStockBySymbol:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const seedStocks = async (req, res) => {
  try {
    const initialStocks = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 150.25,
        change: 2.5,
        changePercent: 1.67,
        marketCap: '2.5T',
        volume: 10000000,
        pe: 25.5,
        dividend: 0.88,
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 290.10,
        change: -1.2,
        changePercent: -0.41,
        marketCap: '2.2T',
        volume: 8000000,
        pe: 30.2,
        dividend: 0.62,
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 2750.80,
        change: 15.3,
        changePercent: 0.56,
        marketCap: '1.8T',
        volume: 1500000,
        pe: 28.5,
        dividend: 0.00,
      },
    ];

    await Stock.bulkCreate(initialStocks);
    res.status(201).json({ message: 'Stocks seeded successfully' });
  } catch (error) {
    console.error('Error in seedStocks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getStocks, getStockBySymbol, seedStocks };