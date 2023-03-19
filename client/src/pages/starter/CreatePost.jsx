import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const CreatePost = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      await response.json();
      navigate('/');
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div>
        <h1>Create an item in MongoDB</h1>
        <p>Test your MongoDB connection.</p>
      </div>
      <form onSubmit={handleSubmit}>
        {loading ? (
          "Loading..."
        ) : (
          <>
          <input type="text" name="name" placeholder="Enter a name" value={formData.name} onChange={handleChange}  />
          <Button colorScheme='green' variant='solid' type="submit">
            Create item in MongoDB
          </Button>
          </>
        )}
        
      </form>
    </section>
  )
};

export default CreatePost;