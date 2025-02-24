'use client';
import { useState, useEffect } from 'react';

// Define a TypeScript type for configs
interface EmailConfig {
  id: number;
  emailAddress: string;
}

export default function HomePage() {
  const [email, setEmail] = useState<string>('');  // Ensure email is a string
  const [configs, setConfigs] = useState<EmailConfig[]>([]); // Ensure configs is an array of EmailConfig

  useEffect(() => {
    fetch('/api/email-ingestion/get-configs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setConfigs(data);
        } else {
          setConfigs([]);  
        }
      })
      .catch((err) => console.error('Error fetching configs:', err));
  }, []);

  const saveConfig = async () => {
    try {
      const response = await fetch('/api/email-ingestion/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailAddress: email, connectionType: 'IMAP', username: email }),
      });

      if (!response.ok) throw new Error('Failed to save config');

      setEmail('');  
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Email PDF Ingestion</h1>
      
      
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={saveConfig}>Save</button>
      
       
      <h2>Configured Emails</h2>
      {configs.length > 0 ? (
        <ul>
          {configs.map((c) => (
            <li key={c.id}>{c.emailAddress || 'No email available'}</li>
          ))}
        </ul>
      ) : (
        <p>No configured emails yet.</p>
      )}

      
      <button onClick={() => fetch('/api/email-ingestion/fetch-pdfs')}>Fetch PDFs</button>
    </div>
  );
}


 
