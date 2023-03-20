import { Flex, Select, Text } from '@chakra-ui/react';

import { CardProduct } from '../components';
import { productsData } from '../constants';

const Products = () => {
  return (
    <div>
        <h1>Lorem ipsum dolor sit amet consectetur.</h1>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laborum dolores necessitatibus earum dolore velit, quo distinctio unde facere aperiam accusantium aliquam ea tempore repudiandae officia, animi culpa temporibus illo obcaecati hic ducimus. Cumque, repudiandae.</h2>
        <Flex 
            direction="row"
            justify="space-between"
            align="center"
            px="5%" 
        >
            
            {/* Filter */}
            <Text>Filter by</Text>
            <Select placeholder='Products'>
                <option value='option1'>Desk</option>
                <option value='option2'>Monitor</option>
                <option value='option3'>Chair</option>
                <option value='option4'>Keyboard</option>
                <option value='option5'>Mouse</option>
                <option value='option6'>Mousepad</option>
                <option value='option7'>Speaker</option>
                <option value='option8'>Headphone</option>
                <option value='option9'>PC</option>
                <option value='option10'>Laptop</option>
                <option value='option11'>Light</option>
                <option value='option12'>Riser</option>
                <option value='option13'>Accessories</option>
            </Select>
            <Select placeholder='Brands'>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
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

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {productsData.map(item => (
                <div key={item.productId}>
                    <CardProduct
                        img={item.img} 
                        type={item.type}
                        brand={item.brand} 
                        model={item.model}
                        slug={`/products/${item.productId}`}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Products