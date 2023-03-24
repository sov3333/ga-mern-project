import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from '../../styles';
import { staggerContainer } from '../../utils/motion';
import { ExploreCard, TitleText, TypingText } from '../../components/home';
import { exploreSetups } from '../../constants';

const Explore = () => {
  const [active, setActive] = useState('setup-2');
  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Featured Desk Setups" textStyles="text-center" />
        <TitleText title={<>Top picks by <br className="md:block hidden" /> the community</>} textStyles="text-center" />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreSetups.map((setup, index) => (
            <ExploreCard
              key={setup.id}
              {...setup}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
