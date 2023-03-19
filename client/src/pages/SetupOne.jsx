import React from 'react'
import { useLocation } from 'react-router-dom';
import { DetailsSetup } from '../components';

const SetupOne = () => {
    const location = useLocation();
    const { setupId, img, user, heading, description, products } = location.state;
  return (
    <div>
        <h1>A Desk Setup</h1>
        <h2>By @{user}</h2>
        <h3>Heading: {heading}</h3>
        <h3>Description: {description}</h3>
        <img src={img} alt={`Desk Setup by ${user}`} />
        <h3>Products</h3>
        <ul>
            {products.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
        <DetailsSetup />
    </div>
  )
}

export default SetupOne