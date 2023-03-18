import React from 'react'
import { Link } from 'react-router-dom';
import { logo } from '../assets';
import { CardProduct } from '../components';

let setupsData = [
    { setupId: 1, img: logo, user: "Alice", products: ["desk", "keyboard"] },
    { setupId: 2, img: logo, user: "Bob", products: ["mouse", "mousepad"] },
    { setupId: 3, img: logo, user: "Charlie", products: ["monitor", "speaker"] },
]

const Setups = () => {
  return (
    <div>
        <h1>All Desk Setups</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {setupsData.map(post => (
                <div key={post.setupId}>
                    <CardProduct />
                    <Link 
                        to={`/setups/${post.setupId}`}
                        state={{ 
                            setupId: post.setupId,
                            img: post.img,
                            user: post.user,
                            products: post.products,
                        }}
                    >
                        <img src={post.img} alt={`Desk Setup by ${post.user}`} />
                        <p>Desk Setup by @{post.user}</p>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Setups