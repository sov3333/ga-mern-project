import React from 'react'
import { productsData } from '../constants';
import { CardProduct } from '../components';



const Products = () => {
  return (
    <div>
        <h1>Lorem ipsum dolor sit amet consectetur.</h1>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laborum dolores necessitatibus earum dolore velit, quo distinctio unde facere aperiam accusantium aliquam ea tempore repudiandae officia, animi culpa temporibus illo obcaecati hic ducimus. Cumque, repudiandae.</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {productsData.map(item => (
                <div key={item.productId}>
                    <CardProduct
                        img={item.img} 
                        brand={item.brand} 
                        model={item.model}
                        slug={`/products/${item.productId}`}
                        linkState={{
                            productId: item.productId,
                            img: item.img,
                            type: item.type,
                            brand: item.brand,
                            model: item.model,        
                        }}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Products