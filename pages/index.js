import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = async () => {
    setIsLoading(true);
    setCopied(false);
    
    try {
      const response = await fetch(`/api/generate?length=${length}`);
      const data = await response.json();
      setPassword(data.password);
    } catch (error) {
      console.error('Error generating password:', error);
      setPassword('Error: Could not generate password');
    }
    
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <Head>
        <title>Secure Password Generator</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <main>
        <h1>Secure Password Generator</h1>
        <p className="description">Generate strong, random passwords instantly</p>
        
        <div className="controls">
          <label>
            Password Length:
            <input 
              type="number" 
              min="8" 
              max="50" 
              value={length} 
              onChange={(e) => setLength(e.target.value)}
            />
          </label>
          
          <button 
            onClick={generatePassword} 
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Password'}
          </button>
        </div>
        
        {password && (
          <div className="result">
            <div className="password-display">
              <input 
                type="text" 
                value={password} 
                readOnly 
                className="password-input"
              />
              <button onClick={copyToClipboard} className="copy-btn">
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            <div className="password-strength">
              <h3>Password Strength:</h3>
              <div className="strength-meter">
                <div 
                  className="strength-bar" 
                  style={{ 
                    width: `${Math.min(100, length * 3)}%`,
                    backgroundColor: length > 14 ? '#4CAF50' : length > 10 ? '#FFC107' : '#F44336'
                  }}
                ></div>
              </div>
              <p className="strength-text">
                {length > 14 ? 'Strong' : length > 10 ? 'Medium' : 'Weak'} - {length} characters
              </p>
            </div>
          </div>
        )}
        
        <div className="api-info">
          <h2>API Usage</h2>
          <p>Use this API endpoint to generate passwords programmatically:</p>
          <code>GET /api/generate?length=16</code>
          <p>Example response:</p>
          <pre>{`{
  "password": "xT5@kG9#qY!v",
  "length": 16,
  "timestamp": "2023-08-15T12:34:56.789Z"
}`}</pre>
        </div>
      </main>

      <footer>
        <p>Deployed on Vercel | Secure Password Generator</p>
      </footer>
    </div>
  );
}
