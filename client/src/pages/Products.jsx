import { Flex, Select, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { CardProduct } from '../components';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/product')
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (parsedData) => {
          setProducts(parsedData);
        },
        (err) => console.log(err)
      );
  }, []);

  const groupedProducts = products.reduce((acc, item) => {
    const { type, brand, model, img, ratings, reviews } = item;
    const existingProduct = acc.find(
      (group) =>
        group.type === type && group.brand === brand && group.model === model
    );
    if (existingProduct) {
      existingProduct.users.push(item.user);
      existingProduct.ratings.push(...ratings);
      existingProduct.reviews.push(...reviews);
    } else {
      acc.push({
        img,
        type,
        brand,
        model,
        ratings: [...ratings],
        reviews: [...reviews],
        users: [item.user],
      });
    }
    return acc;
  }, []);
  // Filtered products based on selected product type and brand
  const filteredProducts =
    selectedProduct && selectedBrand
      ? groupedProducts.filter(
          (products) =>
            products.type === selectedProduct &&
            products.brand === selectedBrand
        )
      : selectedProduct
      ? groupedProducts.filter((products) => products.type === selectedProduct)
      : selectedBrand
      ? groupedProducts.filter((products) => products.brand === selectedBrand)
      : groupedProducts;

  return (
    <div>
      <h1>Lorem ipsum dolor sit amet consectetur.</h1>
      <h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laborum
        dolores necessitatibus earum dolore velit, quo distinctio unde facere
        aperiam accusantium aliquam ea tempore repudiandae officia, animi culpa
        temporibus illo obcaecati hic ducimus. Cumque, repudiandae.
      </h2>
      <Flex direction='row' justify='space-between' align='center' px='5%'>
        {/* Filter */}
        <Text>Filter by</Text>
        <Select
          placeholder='Products'
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value='Desk'>Desk</option>
          <option value='Monitor'>Monitor</option>
          <option value='Chair'>Chair</option>
          <option value='Keyboard'>Keyboard</option>
          <option value='Mouse'>Mouse</option>
          <option value='Mousepad'>Mousepad</option>
          <option value='Speaker'>Speaker</option>
          <option value='Headphone'>Headphone</option>
          <option value='PC'>PC</option>
          <option value='Laptop'>Laptop</option>
          <option value='Light'>Light</option>
          <option value='Riser'>Riser</option>
          <option value='Accessories'>Accessories</option>
        </Select>
        <Select
          placeholder='Brands'
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value='Ominidesk'>Ominidesk</option>
          <option value='Xiaomi'>Xiaomi</option>
          <option value='Razer'>Razer</option>
        </Select>

        {/* Sort */}
        <Text>Sort by</Text>
        <Select placeholder='Sort by'>
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
        {filteredProducts.map((group) => (
          <div key={group.type}>
            <CardProduct
              img={group.img}
              type={group.type}
              brand={group.brand}
              model={group.model}
              ratings={group.ratings}
              reviews={group.reviews}
              slug={`/products/${group.type}`}
              users={group.users}
            />
          </div>
        ))}
        This code should group the products correctly and render the CardProduct
        components with the grouped user data.
      </div>
    </div>
  );
};

export default Products;
