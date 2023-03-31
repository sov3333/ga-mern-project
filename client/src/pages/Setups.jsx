import { Flex, Select, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { CardSetup } from '../components';
import { setupsData } from '../constants';

// SORT & FILTER
// "Filters with dropdown" from https://pro.chakra-ui.com/components/e-commerce/product-filters; but only accessible for paid plans
// To re-create, use the Select component from Chakra https://chakra-ui.com/docs/components/select + Checkbox component https://chakra-ui.com/docs/components/checkbox , and/or other Form components
// Alternatively, might be easier to find a ready-made template (even if its using other frameworks) for SORT+FILTER ui rather than trying to build it from scratch.

const Setups = () => {
  const [setups, setSetups] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/setup')
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (parsedData) => setSetups(parsedData),
        (err) => console.log(err)
      );
  }, []);

  return (
    <div>
      <h1 className='mt-[8px] font-bold md:text-[40px] text-[28px] text-white text-center'>
        View All Desk Setups
      </h1>
      <h2 className='mt-[8px] font-normal sm:text-[28px] text-[18px] text-center text-secondary-white  mb-6'>
        Check out all the desk setups in the world
      </h2>
      <Flex direction='row' align='center' px='5%' color={'gray.300'}>
        {/* Filter */}
        <Select
          placeholder='Filter by Products'
          border='1px' 
          borderColor='gray.600'
          // value={selectedProduct}
          // onChange={(e) => setSelectedProduct(e.target.value)}
          mx="0.5rem"
        >
          {/* Dynamically generated options */}
          {/* {availableTypes.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))} */}
        </Select>
        <Select
          placeholder='Filter by Brand'
          border='1px' 
          borderColor='gray.600'
          // value={selectedBrand}
          // onChange={(e) => setSelectedBrand(e.target.value)}
          mx="0.5rem"
        >
          {/* Dynamically generated options */}
          {/* {avaliableBrands.map((brand, i) => (
            <option key={i} value={brand}>
              {brand}
            </option>
          ))} */}
        </Select>
        {/* Sort */}
        <Select placeholder='Sort by' border='1px' borderColor='gray.600' mx="0.5rem">
          <option value='option1'>✨ Newest</option>
          <option value='option1'>🏷️ Price</option>
          <option value='option2'>⭐ Highest rating</option>
          <option value='option3'>❤️ Most likes</option>
          <option value='option4'>🔥 Trending</option>
        </Select>
      </Flex>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {/* <CardSetup /> */}
        {setups.map((post) => (
          <div key={post._id}>
            <CardSetup
              img={post.img}
              user={post.user}
              title={post.title}
              description={post.description}
              products={post.products}
              slug={`/setups/${post._id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Setups;
