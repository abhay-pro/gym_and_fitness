import { useState, useEffect } from 'react';

export const TypewriterText = ({ text, speed = 80, className = '' }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span className={className}>{displayText}</span>;
};
