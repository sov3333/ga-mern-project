import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';

import styles from '../../styles';
import {fadeIn} from '../../utils/motion';
import {eye} from '../../assets/home';

const ExploreCard = ({
  slug,
  img,
  user,
  title,
  products,
  index,
  active,
  handleClick,
}) => {
  return (
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className={`relative ${
        active === slug ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
      } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
      onClick={() => handleClick(slug)}
    >
      <img
        src={img}
        alt={title}
        className='absolute w-full h-full object-cover rounded-[24px]'
      />
      {active !== slug ? (
        <h3 className='font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]'>
          {title}
        </h3>
      ) : (
        <div className='absolute bottom-0 p-8 justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]'>
          <div
            className={`${styles.flexCenter} w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px] hover:bg-pink-700`}
          >
            <Link
              to={slug}
              state={{
                img: img,
                user: user,
                title: title,
                products: products,
              }}
            >
              <img
                src={eye}
                alt='view icon'
                className='w-8 h-8 object-contain'
              />
            </Link>
          </div>

          <p className='font-normal text-[16px] leading-[20px] text-white uppercase'>
            By @{user}
          </p>
          <h2 className='mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white'>
            {title}
          </h2>
        </div>
      )}
    </motion.div>
  );
};

export default ExploreCard;
