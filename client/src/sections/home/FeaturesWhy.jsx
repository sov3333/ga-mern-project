import { motion } from 'framer-motion';

import styles from '../../styles';
import { staggerContainer, fadeIn } from '../../utils/motion';
import { FeaturesReviews, TitleText, TypingText } from '../../components/home';
import { featuresWhy } from '../../constants';
import { setup_iso_2 } from '../../assets/home';

const FeaturesWhy = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: 'false', amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        className="flex-[0.75] flex justify-center flex-col"
      >
        <TypingText title="| Upgrade Your Desk Game" />
        <TitleText title={<>Gadget reviews by your peers</>} />
        <div className="mt-[48px] flex flex-wrap justify-between gap-[24px]">
          {featuresWhy.map((feature) => (
            <FeaturesReviews
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className={`flex-1 ${styles.flexCenter}`}

      >
        <img src={setup_iso_2} alt="whats-new" className="w-[90%] h-[90%] object-contain" />
      </motion.div>
    </motion.div>
  </section>
);

export default FeaturesWhy;
