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
    ],
    solutions: [
      {
        agentName: 'Scully',
        agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f676174657761792e697279732e78797a2f45537865704c707676536e3930674d716f4b2d4869346535557636442d58746348576256734e576a4e304d',
        route: [
          {
            venueName: 'Jupiter',
            venueImage: 'https://statics.solscan.io/ex-img/JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB.svg'
          },
          {
            venueName: 'Meteora',
            venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
          },
          {
            venueName: 'Phoenix',
            venueImage: 'https://statics.solscan.io/ex-img/PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY.svg'
          },
        ],
        solutionScore: 95
      },
      {
        agentName: 'Mulder',
        agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f63662d697066732e636f6d2f697066732f516d634d50316f35767045523156646d67593248756947444b63793151445a78774d7079736e436868455937746b',
        route: [
          {
            venueName: 'Meteora',
            venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
          },
          {
            venueName: 'Raydium',
            venueImage: 'https://statics.solscan.io/ex-img/CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK.png'
          }
        ],
        solutionScore: 90
      }
    ]
  };

  return (
    <div>
      <div className="bg-zinc-800 p-4 rounded-lg shadow-lg w-96 mb-4">
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

      <div className="bg-zinc-800 p-4 rounded-lg shadow-lg w-96">
        <div className="font-semibold text-white mb-2 text-center">Solutions</div>
        {batchData.solutions.map((solution, index) => (
          <div key={index} className="flex items-center justify-between mb-1 p-1 bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <div className="font-semibold text-white mr-2">{index + 1}</div>
              <img src={solution.agentImage} alt={solution.agentName} className="w-8 h-8 mr-2 rounded-full"/>
              <div className="font-semibold text-white">{solution.agentName}</div>
            </div>
            <div className="relative flex items-center justify-center w-32">
              {solution.route.map((venue, venueIndex) => (
                <img 
                  key={venueIndex} 
                  src={venue.venueImage} 
                  alt={venue.venueName} 
                  className="w-6 h-6 rounded-full absolute" 
                  style={{ left: `${venueIndex * 20}px` }} 
                />
              ))}
            </div>
            <div className="font-semibold text-white">{solution.solutionScore}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBatch;
