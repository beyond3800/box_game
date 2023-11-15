import React, { useState, useMemo } from 'react';

function FactorialCalculator({ number }) {
  // Calculate factorial using useMemo
  const factorial = useMemo(() => {
    console.log('Calculating factorial...');
    
    // Base case: factorial of 0 or 1 is 1
    if (number === 0 || number === 1) {
      return 1;
    }

    // Calculate factorial recursively
    let result = 1;
    for (let i = 2; i <= number; i++) {
        result *= i;
    }

    return result;
  }, [number]); // The dependency array specifies when to recalculate

  return (
    <div>
      <p>Factorial of {number} is {factorial}</p>
    </div>
  );
}

function Hooks() {
  const [inputNumber, setInputNumber] = useState(5);

  return (
    <div>
      <input
        type="number"
        value={inputNumber}
        onChange={(e) => setInputNumber(parseInt(e.target.value))}
      />
      <FactorialCalculator number={inputNumber} />
    </div>
  );
}

export default Hooks;