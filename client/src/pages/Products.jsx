import React from 'react'
import { productsData } from '../constants';
import { CardProduct } from '../components';
import { Flex } from '@chakra-ui/react';



const Products = () => {
  return (
    <div>
        <h1>Lorem ipsum dolor sit amet consectetur.</h1>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laborum dolores necessitatibus earum dolore velit, quo distinctio unde facere aperiam accusantium aliquam ea tempore repudiandae officia, animi culpa temporibus illo obcaecati hic ducimus. Cumque, repudiandae.</h2>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" >
            <h3>TODO:</h3>
            <p>different color on ui for each product type, e.g. OMNIDESK (desks) show blue, KEYCHRON (keyboards) show green, etc. </p>
            <p>Sort - highest rating, most ratings/reviews, price or price range, most favourites, etc </p>
            <p>Filter - by Product type e.g. keyboard, mouse, desk etc </p>
            <p>Filter - by Brand </p>
            <p>"</p>
            <p></p>
        </Flex>
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