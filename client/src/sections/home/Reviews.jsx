import { motion } from 'framer-motion';

import styles from '../../styles';
import { staggerContainer } from '../../utils/motion';
import { ReviewCard, TitleText, TypingText } from '../../components/home';
import { reviews } from '../../constants';

const Reviews = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: 'false', amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title="| Featured Gadget Reviews" textStyles="text-center" />
      <TitleText title="That's what she said" textStyles="text-center" />
      <div className="mt-[50px] flex flex-col gap-[30px]">
        {reviews.map((review, index) => (
          <ReviewCard key={`review-${index}`} {...review} index={index + 1} />
        ))}
      </div>
    </motion.div>
  </section>
);

export default Reviews;
