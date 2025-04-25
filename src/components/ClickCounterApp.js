import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClickCounterApp() {
  const [count, setCount] = useState(0);
  const limit = 10;

  const playSound = (type) => {
    const audio = new Audio(
      type === 'reset'
        ? '/sounds/reset.mp3'
        : type === 'increase'
        ? '/sounds/increase.mp3'
        : '/sounds/decrease.mp3'
    );
    audio.play();
  };

  const increase = () => {
    if (count < limit) {
      setCount(prev => prev + 1);
      playSound('increase');
    }
  };

  const decrease = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
      playSound('decrease');
    }
  };

  const reset = () => {
    setCount(0);
    playSound('reset');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Click Counter App</h1>
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-6xl font-semibold text-blue-700 mb-4"
        >
          {count}
        </motion.div>
      </AnimatePresence>
      {count === limit && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-red-600 mb-4 font-medium"
        >
          You've reached the limit!
        </motion.p>
      )}
      <div className="flex gap-4 mb-4">
        <button
          onClick={increase}
          className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition-transform transform hover:scale-105"
          disabled={count === limit}
        >
          Increase
        </button>
        <button
          onClick={decrease}
          className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition-transform transform hover:scale-105"
          disabled={count === 0}
        >
          Decrease
        </button>
        <button
          onClick={reset}
          className="bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-600 transition-transform transform hover:scale-105"
        >
          Reset
        </button>
      </div>
    </div>
  );
}