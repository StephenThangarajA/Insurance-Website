import Portfolio from '../models/Portfolio.js';
import Stock from '../models/Stock.js';

const getPortfolio = async (req, res) => {
  try {
    const userId = req.user.id;

    const portfolio = await Portfolio.findAll({
      where: { userId },
      include: [{
        model: Stock,
        attributes: ['symbol', 'name', 'price']
      }]
    });

    const portfolioWithMetrics = portfolio.map(item => {
      const currentPrice = item.Stock.price;
      const totalValue = currentPrice * item.shares;
      const profit = totalValue - (item.avgPrice * item.shares);
      const profitPercent = (profit / (item.avgPrice * item.shares)) * 100;

      return {
        ...item.toJSON(),
        currentPrice,
        totalValue,
        profit,
        profitPercent
      };
    });

    res.status(200).json(portfolioWithMetrics);
  } catch (error) {
    console.error('Error in getPortfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const buyStock = async (req, res) => {
  try {
    const { stockId, shares, price } = req.body;
    const userId = req.user.id;
    let portfolioItem = await Portfolio.findOne({
      where: { userId, stockId }
    });
    if (portfolioItem) {
      const totalShares = portfolioItem.shares + shares;
      const totalCost = (portfolioItem.avgPrice * portfolioItem.shares) + (price * shares);
      const newAvgPrice = totalCost / totalShares;
      await portfolioItem.update({
        shares: totalShares,
        avgPrice: newAvgPrice
      });
    } else {
      portfolioItem = await Portfolio.create({
        userId,
        stockId,
        shares,
        avgPrice: price
      });
    }

    res.status(200).json(portfolioItem);
  } catch (error) {
    console.error('Error in buyStock:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const sellStock = async (req, res) => {
  try {
    const { stockId, shares, price } = req.body;
    const userId = req.user.id;

    const portfolioItem = await Portfolio.findOne({
      where: { userId, stockId }
    });

    if (!portfolioItem) {
      return res.status(404).json({ message: 'Stock not found in portfolio' });
    }

    if (portfolioItem.shares < shares) {
      return res.status(400).json({ message: 'Not enough shares to sell' });
    }

    const remainingShares = portfolioItem.shares - shares;
    const newPreviousShares = portfolioItem.previousShares + shares;

    if (remainingShares === 0) {
      await portfolioItem.update({
        shares: 0,
        previousShares: newPreviousShares
      });
      await portfolioItem.destroy();
      res.status(200).json({ message: 'All shares sold successfully' });
    } else {
      await portfolioItem.update({
        shares: remainingShares,
        previousShares: newPreviousShares
      });
      res.status(200).json(portfolioItem);
    }
  } catch (error) {
    console.error('Error in sellStock:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getPortfolio, buyStock, sellStock };