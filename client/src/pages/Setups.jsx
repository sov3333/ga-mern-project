import { Flex } from '@chakra-ui/react';

import { CardSetup } from '../components';
import { setupsData } from '../constants';

const Setups = () => {
  return (
    <div>
        <h1>Lorem ipsum dolor sit amet consectetur.</h1>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iure alias in, error necessitatibus, perspiciatis obcaecati dicta nam labore voluptas ipsum id ut, laborum voluptates nemo voluptatibus? Eligendi hic illo cupiditate reiciendis odit quasi? Deserunt facere tempora quidem voluptates harum perferendis cupiditate.</h2>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" >
            <h3>TODO:</h3>
            <p>Sort - newest, highest rating, most likes ,(trending) etc </p>
            <p>Products Filter - checkbox of all products user want to include</p>
            <p>EXTRA:</p>
            <p>add `tags`, created by user e.g. `gamer`, `dev`, `green`, `neon`</p>
            <p>Filter the setups by 'tags'</p>
            <p></p>
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