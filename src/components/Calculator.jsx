import './Calculator.css';
import React, { useState } from 'react';

function Calculator() {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
   
    const operators = ['+', '-', '*', '/'];
    const lastChar = input.slice(-1);

    if (operators.includes(value) && (input === '' || operators.includes(lastChar))) {
      return; 
    }

    if (value === '.' && (input === '' || lastChar === '.' || input.split(/[\+\-\*\/]/).pop().includes('.'))) {
      return; 
    }

    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = () => {
    try {
      const result = new Function(`return ${input}`)();
      setInput(String(result));
    } catch {
      setInput('Error');
    }
  };

  return (
    <div className="calculator">
      <div className="display">{input || '0'}</div>
      <div className="buttons">
        {[7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', 0, '.', '=', '+'].map((btn) => (
          <button className="btn" key={btn} onClick={() => (btn === '=' ? handleCalculate() : handleClick(String(btn)))}>
            {btn}
          </button>
        ))}
        <button className="btn clear" onClick={handleClear}>C</button>
      </div>
    </div>
  );
}

export default Calculator;