import { useLocation } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { DetailsProduct } from '../components';

const ProductOne = () => {
  const location = useLocation();
  const {
    img,
    type,
    brand,
    model,
    title,
    description,
    features,
    specifications,
    ratings,
  } = location.state;
  console.log(title);
  return (
    <div>
      <h1 className='mt-[8px] font-bold md:text-[40px] text-[28px] text-white text-center'>
        Product
      </h1>
      <h2 className='mt-[8px] font-normal sm:text-[28px] text-[18px] text-center text-secondary-white  mb-6'>
        This is a product
      </h2>
      <div>
        <DetailsProduct
          img={img}
          type={type}
          brand={brand}
          model={model}
          title={title}
          description={description}
          features={features}
          specifications={specifications}
          ratings={ratings}
        />
      </div>
    </div>
  );
};

export default ProductOne;
