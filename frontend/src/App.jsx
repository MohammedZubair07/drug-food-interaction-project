import { useState } from 'react';
import './index.css';
import './App.css';
import Aurora from './components/Aurora/Aurora';

function App() {
  const [drugName, setDrugName] = useState('');
  const [foodName, setFoodName] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyse = async () => {
    if (!drugName || !foodName) {
      setError('Please enter both drug and food names');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://127.0.0.1:8000/predict-interaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          drug: drugName,
          food: foodName
        })
      });

      const data = await response.json();
      setOutput(data.prediction || JSON.stringify(data));
    } catch (err) {
      setError('Unable to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Aurora
        colorStops={["#2563eb", "#db2777", "#3b82f6"]}
        speed={1.0}
      />

      <div className="app-container" style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '24px',
        boxShadow: '0 16px 40px 0 rgba(0, 0, 0, 0.2)',
      }}>
        <div className="header" style={{ marginBottom: '36px' }}>
          <h1 className="title" style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#ffffff',
            background: 'none',
            WebkitBackgroundClip: 'initial',
            WebkitTextFillColor: 'initial',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>Drug Food Interaction Checker</h1>
        </div>

        <div className="form-group" style={{ marginBottom: '24px' }}>
          <label className="label" style={{
            color: '#ffffff',
            fontWeight: '600',
            fontSize: '15px',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            marginBottom: '8px',
            display: 'block'
          }}>Drug Name</label>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-field"
              placeholder="Enter drug name"
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '16px 20px',
                color: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '16px',
                width: '100%'
              }}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '32px' }}>
          <label className="label" style={{
            color: '#ffffff',
            fontWeight: '600',
            fontSize: '15px',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            marginBottom: '8px',
            display: 'block'
          }}>Food Name</label>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-field"
              placeholder="Enter food name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '16px 20px',
                color: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '16px',
                width: '100%'
              }}
            />
          </div>
        </div>

        <button
          className="predict-button glass-button"
          onClick={handleAnalyse}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? "Analysing..." : "Analyse"}
        </button>

        <div className="result-container" style={{ marginTop: '36px' }}>
          <h3 style={{
            color: '#ffffff',
            marginBottom: '12px',
            fontSize: '18px',
            fontWeight: '700',
            marginLeft: '4px',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}>Output</h3>
          <div className="result-card" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            padding: '24px',
            borderRadius: '16px',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <div className="result-content" style={{ width: '100%' }}>
              {error && (
                <p style={{
                  color: '#ef4444',
                  marginBottom: '12px',
                  fontSize: '15px',
                  fontWeight: '600'
                }}>
                  {error}
                </p>
              )}
              <p style={{
                color: output ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                margin: 0,
                fontSize: '16px',
                fontWeight: output ? '600' : '400',
                lineHeight: '1.6'
              }}>
                {output || (!error && 'Analysis result will appear here')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
