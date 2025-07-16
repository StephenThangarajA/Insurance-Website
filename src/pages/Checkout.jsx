import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CreditCardIcon, BanknotesIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const steps = ['Review Order', 'Payment Method', 'Confirmation'];

function Checkout() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Mock order data - in a real app, this would come from the redux store
  const orderData = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 5,
    price: 150.25,
    total: 751.25,
    fees: 4.99,
    grandTotal: 756.24
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Process the order
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/portfolio');
      }, 2000);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Order Summary
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-600 dark:text-gray-400">Symbol:</div>
              <div className="font-semibold text-gray-900 dark:text-white">{orderData.symbol}</div>
              
              <div className="text-gray-600 dark:text-gray-400">Company:</div>
              <div className="text-gray-900 dark:text-white">{orderData.name}</div>
              
              <div className="text-gray-600 dark:text-gray-400">Shares:</div>
              <div className="text-gray-900 dark:text-white">{orderData.shares}</div>
              
              <div className="text-gray-600 dark:text-gray-400">Price per Share:</div>
              <div className="text-gray-900 dark:text-white">${orderData.price.toFixed(2)}</div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-600 dark:text-gray-400">Subtotal:</div>
              <div className="text-gray-900 dark:text-white">${orderData.total.toFixed(2)}</div>
              
              <div className="text-gray-600 dark:text-gray-400">Trading Fees:</div>
              <div className="text-gray-900 dark:text-white">${orderData.fees.toFixed(2)}</div>
              
              <div className="font-semibold text-gray-900 dark:text-white">Total:</div>
              <div className="font-semibold text-gray-900 dark:text-white">${orderData.grandTotal.toFixed(2)}</div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Payment Method
            </h2>
            <div className="space-y-4">
              <div className="text-gray-700 dark:text-gray-300 mb-4">Select a payment method</div>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <input
                    type="radio"
                    name="payment-method"
                    value="creditCard"
                    checked={paymentMethod === 'creditCard'}
                    onChange={handlePaymentMethodChange}
                    className="h-4 w-4 text-primary"
                  />
                  <div className="flex items-center">
                    <CreditCardIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-900 dark:text-white">Credit Card</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <input
                    type="radio"
                    name="payment-method"
                    value="bankTransfer"
                    checked={paymentMethod === 'bankTransfer'}
                    onChange={handlePaymentMethodChange}
                    className="h-4 w-4 text-primary"
                  />
                  <div className="flex items-center">
                    <BanknotesIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-900 dark:text-white">Bank Transfer</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <input
                    type="radio"
                    name="payment-method"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={handlePaymentMethodChange}
                    className="h-4 w-4 text-primary"
                  />
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-900 dark:text-white">PayPal</span>
                  </div>
                </label>
              </div>
            </div>
            
            {paymentMethod === 'creditCard' && (
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name on card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Card number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Expiry date
                    </label>
                    <input
                      type="text"
                      id="expDate"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Last three digits on signature strip</p>
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === 'bankTransfer' && (
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Account Name
                  </label>
                  <input
                    type="text"
                    id="accountName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="routingNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Routing Number
                  </label>
                  <input
                    type="text"
                    id="routingNumber"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
              </div>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="mt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  You will be redirected to PayPal to complete your payment.
                </p>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Your Order
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please review your order details and payment method before confirming.
            </p>
          </div>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((label, index) => (
              <div key={label} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    index <= activeStep
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                  {label}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-16 h-0.5 bg-gray-200 dark:bg-gray-700 mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {getStepContent(activeStep)}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  className={`px-4 py-2 rounded-md ${
                    activeStep === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;