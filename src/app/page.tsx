"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [options, setOptions] = useState<string[]>([
    "Pizza",
    "Sushi",
    "Tacos",
    "Pasta",
    "Burgers",
    "Salad",
    "Curry",
    "Stir Fry",
  ]);
  const [newOption, setNewOption] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  
  // Use a ref to keep track of the interval so we can clear it if the component unmounts
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const addOption = () => {
    const trimmed = newOption.trim();
    if (trimmed) {
      setOptions([...options, trimmed]);
      setNewOption("");
    }
  };

  const removeOption = (indexToRemove: number) => {
    setOptions(options.filter((_, index) => index !== indexToRemove));
  };

  const handleDecide = () => {
    if (options.length === 0) {
      alert("Please add some options first!");
      return;
    }

    setIsThinking(true);
    setResult("Thinking...");

    let counter = 0;
    const maxCount = 20; // Run for a bit longer to simulate suspense

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setResult(options[randomIndex]);
      counter++;

      if (counter >= maxCount) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        const finalIndex = Math.floor(Math.random() * options.length);
        setResult(options[finalIndex]);
        setIsThinking(false);
      }
    }, 100);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans flex items-center justify-center p-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 text-center">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-rose-500 mb-2">What's for Dinner?</h1>
          <p className="text-lg text-gray-600">Can't decide? Let us choose for you!</p>
        </header>

        <main>
          {result && (
            <div className="bg-amber-100 p-8 rounded-lg mb-8 animate-fade-in transition-all">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {isThinking ? "Thinking..." : "You should eat:"}
              </h2>
              <div className="text-4xl font-bold text-gray-900 mb-4">{result}</div>
              {!isThinking && (
                <button
                  onClick={handleDecide}
                  className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-6 rounded-md transition-colors"
                >
                  Spin Again
                </button>
              )}
            </div>
          )}

          <div className="mb-8">
            <button
              onClick={handleDecide}
              disabled={isThinking || options.length === 0}
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white text-xl font-bold py-4 px-8 rounded-lg shadow transition-transform active:scale-95"
            >
              Decide for Me!
            </button>
          </div>

          <section className="text-left border-t border-gray-100 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Your Options</h3>
            <ul className="mb-4 max-h-60 overflow-y-auto space-y-2">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="bg-gray-100 px-4 py-2 rounded flex justify-between items-center group"
                >
                  <span>{option}</span>
                  <button
                    onClick={() => removeOption(index)}
                    className="text-rose-400 hover:text-rose-600 font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove ${option}`}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addOption()}
                placeholder="Add a meal option..."
                className="flex-grow p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                onClick={addOption}
                className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
