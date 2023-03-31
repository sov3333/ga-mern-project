import { motion } from 'framer-motion';
import { Link, Button } from '@chakra-ui/react';

import styles from '../../styles';
import { socials } from '../../constants';
import { footerVariants } from '../../utils/motion';
import { swipe } from '../../assets/home';

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.paddings} py-8 relative`}
  >
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className="font-bold md:text-[64px] text-[44px] text-white">World's Best Desk Setups</h4>
        <Link href="/swipe">
          <Button colorScheme="pink" size="lg">
            <img src={swipe} alt="swipe" className="w-[24px] h-[24px] object-contain" />
            <span className="font-bold text-[16px] text-white px-3">SWIPE RIGHT</span>
          </Button>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h4 className="font-extrabold text-[24px] text-white">Swipe Setups</h4>
          <p className="font-normal text-[14px] text-white opacity-50">
            Copyright © 2023 | SwipeSetups | All rights reserved
          </p>
          <div className="flex gap-4">
            {socials.map((social) => (
              <img
                key={social.name}
                src={social.url}
                alt={social.name}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
