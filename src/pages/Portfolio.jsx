import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPortfolio, reset } from '../redux/slices/portfolioSlice';
import { Link } from 'react-router-dom';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';

function Portfolio() {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { portfolio, isLoading, isError, message } = useSelector(
    (state) => state.portfolio
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getPortfolio());
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total portfolio value
  const safePortfolio = Array.isArray(portfolio) ? portfolio : [];
  const totalValue = safePortfolio.reduce((total, stock) => total + stock.totalValue, 0);
  const totalProfit = safePortfolio.reduce((total, stock) => total + stock.profit, 0);
  const totalProfitPercent = totalValue > 0 ? (totalProfit / (totalValue - totalProfit)) * 100 : 0;

  // Filter stocks with previous shares
  const previousShares = safePortfolio.filter(stock => stock.previousShares > 0);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
        My Portfolio
      </h1>

      {isError && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {message}
        </div>
      )}

      {safePortfolio.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            You don't have any stocks in your portfolio yet.
          </h2>
          <Link
            to="/market"
            className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Browse Stocks
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Portfolio Summary
            </h2>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <div className="w-full sm:w-auto">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Value
                </p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  ${totalValue.toFixed(2)}
                </p>
              </div>
              <div className="w-full sm:w-auto">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Profit/Loss
                </p>
                <div className="flex items-center">
                  <p className={`text-xl sm:text-2xl font-semibold mr-2 ${totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                    ${totalProfit.toFixed(2)}
                  </p>
                  <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${totalProfit >= 0
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                    {totalProfit >= 0 ? (
                      <ArrowTrendingUpIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <ArrowTrendingDownIcon className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                    {`${totalProfit >= 0 ? '+' : ''}${totalProfitPercent.toFixed(2)}%`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 sm:mb-8">
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Current Holdings
              </h2>
            </div>
            {isMobile ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {safePortfolio.map((stock) => (
                  <div key={stock.symbol} className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <Link to={`/stock/${stock.symbol}`} className="text-primary hover:underline font-medium">
                        {stock.symbol}
                      </Link>
                      <Link
                        to={`/stock/${stock.symbol}`}
                        className="inline-flex items-center px-2 py-1 text-xs border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                      >
                        Trade
                      </Link>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{stock.name}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Shares</p>
                        <p className="font-medium text-gray-900 dark:text-white">{stock.shares}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Avg. Price</p>
                        <p className="font-medium text-gray-900 dark:text-white">${stock.avgPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Current Price</p>
                        <p className="font-medium text-gray-900 dark:text-white">${stock.currentPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Total Value</p>
                        <p className="font-medium text-gray-900 dark:text-white">${stock.totalValue.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Profit/Loss</p>
                      <div className="flex items-center">
                        <span className={`mr-2 font-medium ${stock.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                          ${stock.profit.toFixed(2)}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${stock.profit >= 0
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                          {stock.profit >= 0 ? (
                            <ArrowTrendingUpIcon className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowTrendingDownIcon className="mr-1 h-3 w-3" />
                          )}
                          {`${stock.profit >= 0 ? '+' : ''}${stock.profitPercent.toFixed(2)}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Symbol</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Shares</th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Avg. Price</th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Current Price</th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Value</th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Profit/Loss</th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {safePortfolio.map((stock) => (
                      <tr key={stock.symbol}>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <Link to={`/stock/${stock.symbol}`} className="text-primary hover:underline">
                            {stock.symbol}
                          </Link>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{stock.name}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-gray-900 dark:text-white">{stock.shares}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-gray-900 dark:text-white">${stock.avgPrice.toFixed(2)}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-gray-900 dark:text-white">${stock.currentPrice.toFixed(2)}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-gray-900 dark:text-white">${stock.totalValue.toFixed(2)}</td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end">
                            <span className={`mr-2 ${stock.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                              ${stock.profit.toFixed(2)}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stock.profit >= 0
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}>
                              {stock.profit >= 0 ? (
                                <ArrowTrendingUpIcon className="mr-1 h-4 w-4" />
                              ) : (
                                <ArrowTrendingDownIcon className="mr-1 h-4 w-4" />
                              )}
                              {`${stock.profit >= 0 ? '+' : ''}${stock.profitPercent.toFixed(2)}%`}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                          <Link
                            to={`/stock/${stock.symbol}`}
                            className="inline-flex items-center px-3 py-1.5 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                          >
                            Trade
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {previousShares.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Previous Holdings
                </h2>
              </div>
              {isMobile ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {previousShares.map((stock) => (
                    <div key={stock.symbol} className="p-4">
                      <div className="mb-2">
                        <Link to={`/stock/${stock.symbol}`} className="text-primary hover:underline font-medium">
                          {stock.symbol}
                        </Link>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{stock.name}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Shares Sold</p>
                          <p className="font-medium text-gray-900 dark:text-white">{stock.previousShares}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Purchase Price</p>
                          <p className="font-medium text-gray-900 dark:text-white">${stock.avgPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Selling Price</p>
                          <p className="font-medium text-gray-900 dark:text-white">${stock.totalSold ? (stock.totalSold / stock.previousShares).toFixed(2) : '0.00'}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Profit/Loss</p>
                        <div className="flex items-center">
                          <span className={`mr-2 font-medium ${stock.totalProfitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                            ${stock.totalProfitLoss ? stock.totalProfitLoss.toFixed(2) : '0.00'}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${stock.totalProfitLoss >= 0
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                            {stock.totalProfitLoss >= 0 ? (
                              <ArrowTrendingUpIcon className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowTrendingDownIcon className="mr-1 h-3 w-3" />
                            )}
                            {stock.totalProfitLoss ? `${stock.totalProfitLoss >= 0 ? '+' : ''}${((stock.totalProfitLoss / (stock.avgPrice * stock.previousShares)) * 100).toFixed(2)}%` : '0.00%'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Symbol</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Shares Sold</th>
                        <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Purchase Price</th>
                        <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Selling Price</th>
                        <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Profit/Loss</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {previousShares.map((stock) => (
                        <tr key={stock.symbol}>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <Link to={`/stock/${stock.symbol}`} className="text-primary hover:underline">
                              {stock.symbol}
                            </Link>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{stock.name}</td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-gray-900 dark:text-white">{stock.previousShares}</td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-gray-900 dark:text-white">${stock.avgPrice.toFixed(2)}</td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-gray-900 dark:text-white">${stock.totalSold ? (stock.totalSold / stock.previousShares).toFixed(2) : '0.00'}</td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end">
                              <span className={`mr-2 ${stock.totalProfitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                }`}>
                                ${stock.totalProfitLoss ? stock.totalProfitLoss.toFixed(2) : '0.00'}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stock.totalProfitLoss >= 0
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                }`}>
                                {stock.totalProfitLoss >= 0 ? (
                                  <ArrowTrendingUpIcon className="mr-1 h-4 w-4" />
                                ) : (
                                  <ArrowTrendingDownIcon className="mr-1 h-4 w-4" />
                                )}
                                {stock.totalProfitLoss ? `${stock.totalProfitLoss >= 0 ? '+' : ''}${((stock.totalProfitLoss / (stock.avgPrice * stock.previousShares)) * 100).toFixed(2)}%` : '0.00%'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Portfolio;