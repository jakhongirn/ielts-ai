"use client";
import React, { useEffect, useState } from 'react';

const Feedback = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching data from a query parameter or a global state
      const queryParams = new URLSearchParams(window.location.search);
      const promptId = queryParams.get('promptId');
      
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/prompt/`);
        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.error('Failed to fetch AI response:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">AI Response</h1>
      {/* <p className="text-gray-700 text-lg">{response ? response?.content : 'No response received'}</p> */}
    </div>
  );
};

export default Feedback;
