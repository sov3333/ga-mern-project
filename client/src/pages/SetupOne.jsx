import { useLocation } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { DetailsSetup } from '../components';

const SetupOne = () => {
  const location = useLocation();
  const { img, user, title, description, type } = location.state;

  return (
    <div>
      <h1 className="mt-[8px] font-bold md:text-[40px] text-[28px] text-white text-center">Desk Setup</h1>
      <h2 className="mt-[8px] font-normal sm:text-[28px] text-[18px] text-center text-secondary-white  mb-6">This is a desk setup</h2>
      <DetailsSetup
        img={img}
        user={user}
        title={title}
        description={description}
        type={type}
      />
    </div>
  );
};

export default SetupOne;
