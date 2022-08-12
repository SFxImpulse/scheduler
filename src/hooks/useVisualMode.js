import { useState } from 'react';

export default function useVisualMode (initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(prev => [...prev, mode]);
    if (replace) {
      setHistory([initial]);
    }
  };
    
  const back = () => {
    setHistory(prev => [...prev].slice(0, -1));
    setMode(history[history.length - 1]);
  };

  return { mode, transition, back };
  
};