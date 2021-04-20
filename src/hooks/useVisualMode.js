import {React, useState} from "react";

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
    }
    setHistory(prev => ([...prev, newMode]));
    setMode(newMode);
  };

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };

  return {mode, transition, back};
}