import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const UpdatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, name, createdAt, updatedAt } = location.state;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: name,
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
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:8080/api/test/${id}?_method=PUT`, {
                method: 'PUT',
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
    <div>
        <div>
            <h1>Update Post</h1>
            <p>Update this post in MongoDB.</p>
      </div>
      <div>
        <p>This Post ID: {id}</p>
        <p>This Post Name: {name}</p>
        <p>Created: {createdAt}</p>
        <p>Last Updated: {updatedAt}</p>
        <form onSubmit={handleSubmit}>
            <textarea name="name" placeholder="Name" value={formData.name} onChange={handleChange} /><br/>
            <Button colorScheme='yellow' variant='solid' type="submit">
                Submit Changes
            </Button>
        </form>
      </div>
    </div>
  )
};

export default UpdatePost;