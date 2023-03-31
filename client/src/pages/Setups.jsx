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
    fetch('http://localhost:8080/api/setup')
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (parsedData) => setSetups(parsedData),
        (err) => console.log(err)
      );

    // get all products to generate options in filters
    fetch('http://localhost:8080/api/product')
    .then(
      (data) => data.json(),
      (err) => console.log(err)
    )
    .then(
      (parsedData) => {
        setProducts(parsedData);
        console.log(`setProducts with parsedData:`, parsedData);
      },
      (err) => console.log(err)
    );
  }, []);

  /////////////////////////////////////////
  ///// LOGIC FOR SETTING FILTER OPTIONS
  /////////////////////////////////////////

  // TODO: FIX logic to show correct setups by filter

  // Get available product types and brands from the fetched data
  const availableTypes = [...new Set(products.map((product) => product.type))];
  const avaliableBrands = [...new Set(products.map((product) => product.brand))];

  // Group arrays based on their `type` and `brand` properties
  // TODO: Fix groupdProducts to groupSetups
  const groupedProducts = products.reduce((acc, item) => {
    const {
      type,
      brand,
      model,
      img,
      ratings,
      title,
      description,
      features,
      specifications,
    } = item;
    const existingProduct = acc.find(
      (group) =>
        group.type === type && group.brand === brand
    );
    if (existingProduct) {
      existingProduct.users.push(item.user);
      existingProduct.ratings.push(...ratings);
    } else {
      acc.push({
        img,
        type,
        brand,
        model,
        title,
        description,
        features,
        specifications: [...specifications],
        ratings: [...ratings],
        users: [item.user],
      });
    }
    return acc;
  }, []);

  // Remove duplicates from groupedProducts array
  const uniqueProducts = groupedProducts.reduce((acc, product) => {
    const existingProductIndex = acc.findIndex(
      (p) =>
        p.type === product.type &&
        p.brand === product.brand
    );
    if (existingProductIndex === -1) {
      acc.push(product);
    }
    return acc;
  }, []);

  // Filtered setups based on selected product type and brand
  // TODO: Fix filterProducts to filteredSetups
  const filteredProducts = uniqueProducts.filter((product) => {
    if (selectedProduct && selectedBrand) {
      return (
        (product.type === selectedProduct ||
          product.brand === selectedProduct) &&
        (product.type === selectedBrand || product.brand === selectedBrand)
      );
    } else if (selectedProduct) {
      return (
        product.type === selectedProduct ||
        product.brand === selectedProduct
      );
    } else if (selectedBrand) {
      return (
        product.type === selectedBrand ||
        product.brand === selectedBrand
      );
    } else {
      return true;
    }
  });
  console.log(`filteredSetups`, filteredProducts);

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
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          mx="0.5rem"
        >
          {/* Dynamically generated options */}
          {availableTypes.map((type, i) => (
            <option key={i} value={type}>
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
          mx="0.5rem"
        >
          {/* Dynamically generated options */}
          {avaliableBrands.map((brand, i) => (
            <option key={i} value={brand}>
              {brand}
            </option>
          ))}
        </Select>
        {/* Sort */}
        <Select placeholder='Sort by' border='1px' borderColor='gray.600' mx="0.5rem">
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
