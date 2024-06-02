import React from 'react';

const OrderBatch = () => {
  const batchData = {
    batchNumber: 1920,
    batchTime: '2022-01-01 12:00:00',
    orders: [
      {
        srcToken: {
          image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
          name: 'USDC',
          amount: '100',
        },
        targetToken: {
          image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
          name: 'WIF',
          amount: '400',
        }
      },
      {
        srcToken: {
          image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
          name: 'WIF',
          amount: '400',
        },
        targetToken: {
          image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
          name: 'USDC',
          amount: '100',
        }
      }
    ]
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-lg w-96">
      <div className="font-semibold text-white mb-4 text-center">Batch #{batchData.batchNumber}</div>
      {batchData.orders.map((order, index) => (
        <div key={index} className="flex items-center justify-between mb-1 p-1 bg-gray-700 rounded-lg">
          <div className="flex items-center w-1/2">
            <img src={order.srcToken.image} alt={order.srcToken.name} className="w-8 h-8 mr-2 rounded-full"/>
            <div>
              <div className="text-gray-400 text-sm">{order.srcToken.amount}</div>
              <div className="font-semibold text-white text-sm">{order.srcToken.name}</div>
            </div>
          </div>
          <div className="w-16 flex justify-center text-gray-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </div>
          <div className="flex items-center w-1/2 justify-end">
            <div className="mr-2 text-right">
              <div className="text-gray-400 text-sm">{order.targetToken.amount}</div>
              <div className="font-semibold text-white text-sm">{order.targetToken.name}</div>
            </div>
            <img src={order.targetToken.image} alt={order.targetToken.name} className="w-8 h-8 rounded-full"/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderBatch;
