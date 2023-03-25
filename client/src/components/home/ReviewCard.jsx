import { motion } from 'framer-motion';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Button, Link } from '@chakra-ui/react';

import { fadeIn } from '../../utils/motion';
// import { arrow } from '../../assets/home';

const ReviewCard = ({ imgUrl, title, subtitle, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 1)}
    className="flex md:flex-row flex-col gap-4"
  >
    <img src={imgUrl} alt="product" className="md:w-[270px] w-full h-[250px] rounded-[32px] object-cover" />
    <div className="w-full flex justify-between items-center">
      <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
        <div className="flex justify-between">
          <h4 className="font-normal lg:text-[32px] text-[26px] text-white">{title}</h4>
          <Link href="/products">
            <Button colorScheme="pink" size="md">View</Button>
          </Link>
        </div>
        <div className="flex mt-[8px] items-center">
          <p className="mr-[10px] text-white font-extrabold border-2 py-1 px-3 rounded-lg">4.89</p>
          {[...Array(4)].map((_, i) => (
            <BsStarFill  key={i} className="ml-[1px] text-white" />
          ))}
          <BsStarHalf className="ml-[1px] text-white" />
          <p className="ml-[10px] text-white">1,088 reviews</p>
        </div>
        <p className="mt-[16px] font-normal lg:text-[16px] text-[14px] text-secondary-white italic">"{subtitle}"</p>
      </div>
      {/* <div className="lg:flex hidden items-center justify-center w-[100px] h-[100px] rounded-full bg-transparent border-[1px] border-white">
        <img src={arrow} alt="arrow" className="w-[40%] h-[40%] object-contain" />
      </div> */}
    </div>
  </motion.div>
);

export default ReviewCard;
