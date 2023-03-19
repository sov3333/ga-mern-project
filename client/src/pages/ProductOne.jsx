import React from 'react'
import { useLocation } from 'react-router-dom';
import { DetailsProduct } from '../components';

const ProductOne = () => {
    const location = useLocation();
    const { productId, img, type, brand, model } = location.state;
  return (
    <div>
        <h1>Product</h1>
        <h2>{type}</h2>
        <img src={img} alt={`${brand}-${model}`} />
        <h3>{brand} ({model})</h3>
        <p>View Setups with {brand} {type}</p>
        <DetailsProduct />
    </div>
  )
}

export default ProductOne