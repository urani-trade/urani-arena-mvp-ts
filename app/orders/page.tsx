"use client";

import React, { useEffect, useRef, useState } from 'react';
import Sparkle from 'react-sparkle';

export default function Leaderboard() {
  const sparkleRef = useRef(null);
  const [size, setSize] = useState(30);

  useEffect(() => {
    let position = 0;
    let increasing = true;

    const interval = setInterval(() => {
      if (sparkleRef.current) {
        position += 5;
        if (increasing) {
          setSize(prevSize => prevSize + 5);
          if (size >= 100) increasing = false;
        } else {
          setSize(prevSize => prevSize - 5);
          if (size <= 30) increasing = true;
        }

        // sparkleRef.current.style.transform = `translateY(${position}px)`;
        // sparkleRef.current.style.width = `${size}px`;
        // sparkleRef.current.style.height = `${size}px`;
        sparkleRef.current.style.left = `${size}px`;
        sparkleRef.current.style.top = `${size}px`;
        // sparkleRef.current.style.transform = `rotate(${position}deg)`;
        sparkleRef.current.style.display = 'block';
        sparkleRef.current.style.backgroundColor = 'red';
      }
    }, 100); // Fast interval

    return () => clearInterval(interval);
  }, [size]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={sparkleRef} style={{ position: 'absolute', top: '0px', left: '50%' }}>
        <Sparkle flicker={false} count={10} fadeOutSpeed={15}/>
      </div>
    </div>
  );
}
