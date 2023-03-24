import { motion } from 'framer-motion';
import { TypingText } from '../../components/home';

import styles from '../../styles';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { arrow_down } from '../../assets/home';

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Swipe Setups" textStyles="text-center" />
      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        Show off your <span className="font-extrabold text-white">trading or programming desk setup</span> and swipe through other setups to rate and <span className="font-extrabold text-white">get inspired</span>. Discover new hardware, layouts, and styles, and <span className="font-extrabold text-white">compete for the top ranks</span> in our community-driven leaderboard. Join <span className="font-extrabold text-white">SwipeSetups</span> today and take your desk to the next level
      </motion.p>
      <motion.img
        variants={fadeIn('up', 'tween', 0.3, 1)}
        src={arrow_down}
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
