// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

function ClickCounter() {
  const [count, setCount] = useState(0);

  // Function to fetch the click count from the server
  const fetchClickCount = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/backend'); // Use the correct backend URL
      if (response.ok) {
        const data = await response.json();
        setCount(data.count);
      } else {
        console.error('Failed to fetch click count');
      }
    } catch (error) {
      console.error('Error fetching click count:', error);
    }
  };

  // Function to increment the click count
  const incrementClickCount = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/backend', { // Use the correct backend URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: count + 1 }),
      });
      if (response.ok) {
        setCount(count + 1);
      } else {
        console.error('Failed to update click count');
      }
    } catch (error) {
      console.error('Error updating click count:', error);
    }
  };

  useEffect(() => {
    // Fetch the initial click count when the component mounts
    fetchClickCount();
  }, []);

  return (
    <div>
      <h1>Click Counter</h1>
      <p>Count: {count}</p>
      <button onClick={incrementClickCount}>Increment</button>
    </div>
  );
}

export default ClickCounter;
