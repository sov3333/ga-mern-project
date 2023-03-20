import { Flex, Select, Text } from '@chakra-ui/react';

import { CardSetup } from '../components';
import { setupsData } from '../constants';

// SORT & FILTER
// "Filters with dropdown" from https://pro.chakra-ui.com/components/e-commerce/product-filters; but only accessible for paid plans
// To re-create, use the Select component from Chakra https://chakra-ui.com/docs/components/select + Checkbox component https://chakra-ui.com/docs/components/checkbox , and/or other Form components
// Alternatively, might be easier to find a ready-made template (even if its using other frameworks) for SORT+FILTER ui rather than trying to build it from scratch.

const Setups = () => {
  return (
    <div>
        <h1>Lorem ipsum dolor sit amet consectetur.</h1>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iure alias in, error necessitatibus, perspiciatis obcaecati dicta nam labore voluptas ipsum id ut, laborum voluptates nemo voluptatibus? Eligendi hic illo cupiditate reiciendis odit quasi? Deserunt facere tempora quidem voluptates harum perferendis cupiditate.</h2>
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
            <Select placeholder='Tags'>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
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
                <option value='option2'>⭐ Highest rating</option>
                <option value='option3'>❤️ Most likes</option>
                <option value='option4'>🔥 Trending</option>
            </Select>

        </Flex>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {setupsData.map(post => (
                <div key={post.setupId}>
                    <CardSetup 
                        img={post.img} 
                        user={post.user} 
                        title={post.heading} 
                        description={post.description}
                        products={post.products}
                        slug={`/setups/${post.setupId}`}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Setups