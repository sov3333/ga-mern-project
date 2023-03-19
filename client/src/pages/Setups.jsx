import React from 'react'
import { setupsData } from '../constants';
import { CardSetup } from '../components';

const Setups = () => {
  return (
    <div>
        <h1>Lorem ipsum dolor sit amet consectetur.</h1>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iure alias in, error necessitatibus, perspiciatis obcaecati dicta nam labore voluptas ipsum id ut, laborum voluptates nemo voluptatibus? Eligendi hic illo cupiditate reiciendis odit quasi? Deserunt facere tempora quidem voluptates harum perferendis cupiditate.</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {setupsData.map(post => (
                <div key={post.setupId}>
                    <CardSetup 
                        img={post.img} 
                        brand={`@${post.user}`} 
                        model={post.heading} 
                        slug={`/setups/${post.setupId}`}
                        linkState={{
                            setupId: post.setupId,
                            img: post.img,
                            user: post.user,
                            heading: post.heading,
                            description: post.description,
                            products: post.products,
                        }} 
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Setups