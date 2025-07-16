import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';

function StockCard({ stock }) {
  const { symbol, name, price, change, changePercent } = stock;
  const isPositive = change >= 0;

  return (
    <Link
      to={`/stock/${symbol}`}
      className="block h-full hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
    >
      <div className="p-4 h-full flex flex-col">
        <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {symbol}
        </h5>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {name}
        </p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          ${price.toFixed(2)}
        </p>
        <div className="mt-2 flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isPositive 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {isPositive ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4" />
            )}
            {`${isPositive ? '+' : ''}${change.toFixed(2)} (${isPositive ? '+' : ''}${changePercent.toFixed(2)}%)`}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default StockCard;