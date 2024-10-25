import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/bmi', {
        weight,
        height,
      });
      setResult(response.data);
    } catch (error) {
      alert('Please enter valid inputs');
    }
  };

  const getResultClass = () => {
    if (!result) return '';
    switch (result.category) {
      case 'Underweight. Please try and gain weight':
        return 'underweight';
      case 'Normal Weight. You are perfectly Healthy. Keep it Up':
        return 'normal';
      case 'Overweight. Please try and reduce your weight':
        return 'overweight';
      case 'Obesity. Warning. Please concentrate on yourself.':
        return 'obesity';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <h1>BMI Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <button type="submit">Calculate</button>
      </form>
    <div>
      {result && (
        <div className={getResultClass()}>
          <p>Your BMI: {result.bmi.toFixed(2)}</p>
          <p>{result.category}</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default BMICalculator;
