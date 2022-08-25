// Defines and exports the useVisualMode custom hook.
import { useState } from 'react';

export default function useVisualMode (initial) {
  
  // Defines the states for mode and history, as well as their setter functions.
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  // Transition function
    // Transitions to a different mode when a specific action is taken.
    // Asserts when to replace a mode.
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(prev => [...prev, mode]);
    if (replace) {
      setHistory(prev => [...prev].slice(0, -1));
    }
  };

  // Back function
    // Removes a mode from the history array to return to a previous one.
  const back = () => {
    setHistory(prev => [...prev].slice(0, -1));
    setMode(history[history.length - 1]);
  };
  
  return { mode, transition, back };
  
};