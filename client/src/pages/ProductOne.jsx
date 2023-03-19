import React from 'react'
import { useLocation } from 'react-router-dom';
import { DetailsProduct } from '../components';

const ProductOne = () => {
    const location = useLocation();
    const { img, type, brand, model, slug } = location.state;
  return (
    <div>
        <h1>Product</h1>
        <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores repellat vero mollitia. Doloremque in nulla hic accusamus voluptatibus vel nam dolore! Accusantium, eligendi sit?</h2>
        {/* <img src={img} alt={`${brand}-${model}`} />
        <h3>{brand} ({model})</h3>
        <p>View Setups with {brand} {type}</p> */}
        <DetailsProduct 
          img={img}
          type={type}
          brand={brand}
          model={model}
          slug={slug}
        />
    </div>
  )
}

export default ProductOne