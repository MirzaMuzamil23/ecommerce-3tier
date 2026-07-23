import { useState, useEffect } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/products';
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🛒 Enterprise E-Commerce Store</h1>
      {loading ? <p>Loading catalog...</p> : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {products.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}