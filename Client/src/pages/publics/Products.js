// Trong file components/Products.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiGetProducts } from '../../apis/products';

function Products({productData}) {
  const [product, setProducts] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await apiGetProducts();
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, [productData]);

  return (
    <div>
      <h2>{product?.title}</h2>
      
    </div>
  );
}

export default Products;
