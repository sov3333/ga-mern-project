import { useLocation } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { DetailsSetup } from '../components';

const SetupOne = () => {
  const location = useLocation();
  const { img, user, title, description, products } = location.state;

  return (
    <div>
      <h1>A Desk Setup</h1>
      <h2>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id totam nisi
        facere nesciunt, similique explicabo nobis tenetur ratione harum nulla
        sequi aspernatur minima aliquam doloribus?
      </h2>
      <Flex flexDirection='column' justifyContent='center' alignItems='center'>
        <h3>TODO:</h3>
        <p></p>
      </Flex>
      <DetailsSetup
        img={img}
        user={user}
        title={title}
        description={description}
        products={products}
      />
    </div>
  );
};

export default SetupOne;
