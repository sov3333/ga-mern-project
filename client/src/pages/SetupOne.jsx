import {useLocation} from 'react-router-dom';
import {Text} from '@chakra-ui/react';

import {DetailsSetup} from '../components';

const SetupOne = () => {
  const location = useLocation();
  const { _id, img, userId, user, title, description, products, swipes } = location.state;

  return (
    <div>
      <Text
        as={'h1'}
        lineHeight={1.1}
        bgGradient='linear(to-r, red.400,pink.400)'
        bgClip='text'
        className='mt-[8px] font-bold md:text-[40px] text-[28px] text-white text-center'
      >
        Desk Setup
      </Text>
      <h2 className='mt-[8px] font-normal sm:text-[28px] text-[18px] text-center text-secondary-white  mb-6'>
        This is a desk setup
      </h2>
      <DetailsSetup
        _id={_id}
        img={img}
        userId={userId}
        user={user}
        title={title}
        description={description}
        products={products}
        swipes={swipes}
      />
    </div>
  );
};

export default SetupOne;
