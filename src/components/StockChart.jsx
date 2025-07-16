import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StockChart({ historicalData, symbol }) {
  const chartData = {
    labels: historicalData.map(data => data.date),
    datasets: [
      {
        label: `${symbol} Price`,
        data: historicalData.map(data => data.price),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${symbol} Historical Price Data`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h6 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Price History
        </h6>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default StockChart;