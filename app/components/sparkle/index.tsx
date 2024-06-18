import React from 'react';
import './index.css';

const Sparkle = ({ children, count = 20 }: { children:React.ReactNode, count:number}) => {
  return (
    <div className="sparkle-container">
      {children}
      <div className="sparkles">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="sparkle" />
        ))}
      </div>
    </div>
  );
};

export default Sparkle;
