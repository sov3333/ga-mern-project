import { Flex, Select, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { CardSetup } from '../components';

const Setups = () => {
  const [setups, setSetups] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    // get all setups to display cards
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/setup`)
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (parsedData) => {
          // count the likes in each setup and add it as a new key `likedCount`
          let allSetups = parsedData;
          let newSetupsArray = allSetups.map(item => {
            let likedCount = item.swipes.filter(swipe => swipe.liked).length;
            return { ...item, likedCount };
          });
          setSetups(newSetupsArray);
        },
        (err) => console.log(err)
      );

    // get all products to generate options in filters
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/product`)
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (parsedData) => {
          setProducts(`parsedData from product`, parsedData);
        },
        (err) => console.log(err)
      );
  }, []);

  // Get available product types and brands from the fetched data
  // Get all products from all setups
  const allProducts = setups.flatMap((setup) => setup.products);

  // Get available types with their corresponding brands
  const availableTypes = allProducts.reduce((acc, product) => {
    if (!acc[product.type]) {
      acc[product.type] = [];
    }
    if (!acc[product.type].includes(product.brand)) {
      acc[product.type].push(product.brand);
    }
    return acc;
  }, {});

  // Create an array of objects that represent each product type and its available brands
  const typeBrandPairs = Object.entries(availableTypes).map(
    ([type, brands]) => ({
      type,
      brands,
    })
  );

  // filter the setups based on the selected product type and brand
  const filteredSetups = selectedProduct
    ? setups.filter((setup) =>
        setup.products.some(
          (product) =>
            product.type === selectedProduct &&
            (!selectedBrand || product.brand === selectedBrand)
        )
      )
    : setups;

  // filter brands based on selected product type
  const filteredBrands = typeBrandPairs.find(
    (item) => item.type === selectedProduct
  )?.brands;

  return (
    <div>
      <Text
        as={'h1'}
        lineHeight={1.1}
        bgGradient='linear(to-r, red.400,pink.400)'
        bgClip='text'
        className='mt-[8px] font-bold md:text-[40px] text-[28px] text-white text-center'
      >
        View All Desk Setups
      </Text>
      <h2 className='mt-[8px] font-normal sm:text-[28px] text-[18px] text-center text-secondary-white  mb-6'>
        Check out all the desk setups in the world
      </h2>
      <Flex direction='row' align='center' px='5%' color={'gray.300'}>
        {/* Filter */}
        <Select
          placeholder='Filter by Products'
          border='1px'
          borderColor='gray.600'
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          mx='0.5rem'
        >
          {/* Dynamically generated options */}
          {Object.keys(availableTypes).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <Select
          placeholder='Filter by Brand'
          border='1px'
          borderColor='gray.600'
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          mx='0.5rem'
        >
          {/* Dynamically generated options */}
          {filteredBrands && filteredBrands.length > 0 ? (
            filteredBrands.map((brand, i) => (
              <option key={i} value={brand}>
                {brand}
              </option>
            ))
          ) : (
            <option value=''>No brands available</option>
          )}
        </Select>
        {/* Sort */}
        <Select
          placeholder='Sort by'
          border='1px'
          borderColor='gray.600'
          mx='0.5rem'
        >
          <option value='option1'>✨ Newest</option>
          <option value='option2'>⭐ Highest rating</option>
          <option value='option3'>❤️ Most likes</option>
          <option value='option4'>🔥 Trending</option>
        </Select>
      </Flex>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* <CardSetup /> */}
        {filteredSetups.map((post) => (
          <div key={post._id}>
            <CardSetup
              _id={post._id}
              img={post.img}
              userId={post.userId}
              user={post.user}
              title={post.title}
              description={post.description}
              products={post.products}
              swipes={post.swipes}
              likedCount={post.likedCount}
              slug={`/setups/${post._id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Setups;
