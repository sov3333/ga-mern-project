import React from 'react'
import { Link } from 'react-router-dom';
import { CardProduct } from '../components';

let productsData = [
    { productId: 1, type: "Desk", brand: "Omnidesk", model: "Ascent Wildwood+" },
    { productId: 2, type: "Keyboard", brand: "Keychron", model: "K4" },
    { productId: 3, type: "Mouse", brand: "Razer", model: "Deathadder V2" },
]

const Products = () => {
  return (
    <div>
        <h1>All Products</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {productsData.map(item => (
                <div key={item.productId}>
                    <CardProduct />
                    <Link 
                        to={`/products/${item.productId}`}
                        state={{ 
                            productId: item.productId,
                            type: item.type,
                            brand: item.brand,
                            model: item.model,
                        }}
                    >
                        <p>{item.type} by {item.brand} ({item.model})</p>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Products