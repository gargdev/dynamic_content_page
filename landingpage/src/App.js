import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios.get('https://dynamic-content-page.onrender.com/api/content').then(res => setContent(res.data));
  }, []);
   useEffect(() => {
    const interval = setInterval(() => {
      axios.get('https://dynamic-content-page.onrender.com/api/content').then(res => setContent(res.data));
    }, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-4xl font-bold text-center">Welcome to Our Restaurant</h1>
      </header>

      <main className="p-6">
        {content.map(item => (
          <section key={item._id} className="bg-white p-6 mb-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
            <p className="text-gray-600 mt-2">{item.description}</p>
            {item.image && <img src={item.image} alt={item.title} className="mt-4 rounded-lg max-w-full" />}
          </section>
        ))}
      </main>
    </div>
  );
};

export default App;
