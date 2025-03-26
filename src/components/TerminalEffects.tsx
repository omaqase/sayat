
import React, { useState, useEffect } from 'react';

interface MotionProps {
  text: string;
  delay?: number;
  className?: string;
}

export const Motion: React.FC<MotionProps> = ({ text, delay = 20, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, delay]);

  return <div className={className}>{displayedText}</div>;
};

interface TypewriterProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  delay = 70, 
  onComplete,
  className = ''
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, onComplete, text]);

  return <span className={`${className} typed-out`}>{currentText}</span>;
};
