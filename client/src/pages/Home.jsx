import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

import { Component1, Component2, Component3 } from '../components';

import { exampleArray } from '../constants/index';

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/test', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse()); // show latest post on top
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleDelete = async (e, prop) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/test/${prop}?_method=DELETE`, {
          method: 'POST',
      });
      await response.json();
      window.location.reload(); // Refresh the page
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div>
        <h1>MERN Starter Code</h1>
        <p>This is a starter code for MERN projects.</p>
      </div>
      <div>
        <h3>DATA FROM MONGODB</h3>
        {loading ? ( 'Loading...' ) : (
          <ul>
            {allPosts?.map((e, i) => (
              <li key={i}>
                {e.name}
                <Link 
                  to={`/update/${e._id}`} 
                  state={{ 
                    id: e._id,
                    name: e.name,
                    createdAt: e.createdAt,
                    updatedAt: e.updatedAt,
                  }}
                >
                  <Button colorScheme='yellow' variant='solid'>UPDATE</Button>
                </Link>
                <form onSubmit={(event) => handleDelete(event, e._id)}>
                  <Button colorScheme='red' variant='solid' type="submit">DELETE</Button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3>COMPONENTS</h3>
        <Component1 />
        <Component2 />
        <Component3 />
      </div>
      <div>
        <h3>DATA FROM STATIC CONSTANTS</h3>
        {exampleArray.map((e, i) => (
          <p key={i}>{e}</p>
        ))}
      </div>
    </section>
  )
}

export default Home;