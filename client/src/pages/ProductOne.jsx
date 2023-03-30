import { useLocation } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';

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
      <Text
        as={'h1'}
        lineHeight={1.1}
        bgGradient='linear(to-r, red.400,pink.400)'
        bgClip='text'
        className="mt-[8px] font-bold md:text-[40px] text-[28px] text-white text-center"
      >
        {brand} - {model}
      </Text>
      <h2 className="mt-[8px] font-normal sm:text-[28px] text-[18px] text-center text-secondary-white  mb-6">{type}</h2>
      <div>
        <DetailsProduct
          img={img}
          type={type}
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
