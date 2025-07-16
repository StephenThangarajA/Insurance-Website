import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStocks, reset } from '../redux/slices/stocksSlice';
import { buyStock, sellStock } from '../redux/slices/portfolioSlice';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Coins, Building2, PiggyBank, Bitcoin, Search } from 'lucide-react';
import { mockData } from '../data/mockData';

function Market() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stocks, isLoading, isError, message } = useSelector(
    (state) => state.stocks
  );
  const { user } = useSelector((state) => state.auth);
  const { portfolio } = useSelector((state) => state.portfolio);

  const [selectedStock, setSelectedStock] = useState(null);
  const [shares, setShares] = useState(1);
  const [orderType, setOrderType] = useState('buy');
  const [selectedInvestmentType, setSelectedInvestmentType] = useState('stocks');
  const [investmentData, setInvestmentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const investmentTypes = [
    { id: 'stocks', name: 'Stocks', icon: <Building2 className="w-5 h-5" /> },
    { id: 'mutual-funds', name: 'Mutual Funds', icon: <PiggyBank className="w-5 h-5" /> },
    { id: 'cryptocurrency', name: 'Cryptocurrency', icon: <Bitcoin className="w-5 h-5" /> },
    { id: 'equity', name: 'Equity', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'chit-fund', name: 'Chit Fund', icon: <Coins className="w-5 h-5" /> },
  ];

  useEffect(() => {
    // Simulate real-time data updates
    const fetchData = () => {
      const data = mockData[selectedInvestmentType] || [];
      // Add some random price fluctuations to simulate real-time updates
      const updatedData = data.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * 2,
        change: item.change + (Math.random() - 0.5) * 0.5,
        changePercent: ((item.change + (Math.random() - 0.5) * 0.5) / item.price) * 100
      }));
      setInvestmentData(updatedData);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [selectedInvestmentType]);

  const handleStockSelect = (item) => {
    setSelectedStock(item);
    setShares(1);
    setOrderType('buy');
  };

  const handleSharesChange = (e) => {
    setShares(Number(e.target.value));
  };

  const handleOrderTypeChange = (type) => {
    // Only allow 'buy' type in Market page
    setOrderType('buy');
    setShares(1);
  };

  const handleSubmitOrder = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Only handle buy orders in Market page
    dispatch(buyStock({
      stockId: selectedStock.id,
      name: selectedStock.name,
      shares: shares,
      price: selectedStock.price
    }));
    navigate('/checkout');
  };

  const renderAdditionalInfo = (item) => {
    switch (selectedInvestmentType) {
      case 'mutual-funds':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              NAV: ${item.nav}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              Expense Ratio: {item.expenseRatio}
            </td>
          </>
        );
      case 'cryptocurrency':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              Market Cap: ${item.marketCap}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              24h Volume: ${item.volume24h}
            </td>
          </>
        );
      case 'equity':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              Dividend Yield: {item.dividendYield}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              Market Cap: ${item.marketCap}
            </td>
          </>
        );
      case 'chit-fund':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              Duration: {item.duration}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              Members: {item.members}
            </td>
          </>
        );
      default:
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              Volume: {item.volume}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              -
            </td>
          </>
        );
    }
  };

  // Filter data based on search query
  const filteredData = investmentData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Market
      </h1>

      {isError && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {message}
        </div>
      )}

      {/* Investment Type Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Select Investment Type
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {investmentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedInvestmentType(type.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${selectedInvestmentType === type.id
                ? 'border-gray-900 dark:border-white bg-gray-100 dark:bg-gray-700'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
            >
              <div className="mb-2 text-gray-900 dark:text-white">
                {type.icon}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {type.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-gray-900 dark:text-white"
            placeholder="Search by name or symbol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Investment List */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="min-w-full">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
                      {selectedInvestmentType === 'stocks' ? 'Symbol' : 'ID'}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
                      Name
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6">
                      Price
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6">
                      Change
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredData.map((item) => {
                    const isPositive = item.change >= 0;
                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${selectedStock?.id === item.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                          }`}
                        onClick={() => handleStockSelect(item)}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <img
                                className="h-8 w-8 rounded-full object-contain bg-white"
                                src={item.logo}
                                alt={item.name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/32';
                                }}
                              />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {item.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                            {item.description}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-right text-gray-900 dark:text-white">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-sm text-right">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isPositive
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}
                          >
                            {isPositive ? (
                              <TrendingUp className="mr-1 h-3 w-3" />
                            ) : (
                              <TrendingDown className="mr-1 h-3 w-3" />
                            )}
                            {`${isPositive ? '+' : ''}${item.change.toFixed(2)} (${isPositive ? '+' : ''}${item.changePercent.toFixed(2)}%)`}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right text-sm font-medium">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStockSelect(item);
                            }}
                            className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            Trade
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Panel */}
        <div className="lg:col-span-1">
          {selectedStock ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {selectedStock.name} ({selectedStock.id})
              </h2>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <button
                    className="w-full py-2 px-4 text-center rounded-md bg-gray-900 text-white"
                  >
                    Buy
                  </button>
                </div>

                {/* Rest of the order panel */}
                <div className="mb-4">
                  <label htmlFor="shares" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {selectedInvestmentType === 'cryptocurrency' ? 'Amount' : 'Shares'}
                  </label>
                  <input
                    type="number"
                    id="shares"
                    min="1"
                    value={shares}
                    onChange={handleSharesChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-gray-900 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Market Price
                  </p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    ${selectedStock.price.toFixed(2)}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Estimated {orderType === 'buy' ? 'Cost' : 'Proceeds'}
                  </p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    ${(selectedStock.price * shares).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={handleSubmitOrder}
                  className="w-full py-3 px-4 rounded-md text-white font-medium bg-gray-900 hover:bg-gray-800"
                >
                  Buy {shares} {selectedInvestmentType === 'cryptocurrency' ? 'Units' : shares === 1 ? 'Share' : 'Shares'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Select an investment to start trading
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Market;
