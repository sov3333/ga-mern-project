import { useLocation } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { DetailsProduct } from '../components';

const ProductOne = () => {
  const location = useLocation();
  const { img, brand, model, ratings, reviews } = location.state;
  console.log(reviews);
  return (
    <div>
      <h1>Product</h1>
      <h2>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
        repellat vero mollitia. Doloremque in nulla hic accusamus voluptatibus
        vel nam dolore! Accusantium, eligendi sit?
      </h2>
      <Flex flexDirection='column' justifyContent='center' alignItems='center'>
        <h3>TODO:</h3>
        <p></p>
      </Flex>
      <DetailsProduct
        img={img}
        brand={brand}
        model={model}
        ratings={ratings}
        reviews={reviews}
      />
    </div>
  );
};

export default ProductOne;
