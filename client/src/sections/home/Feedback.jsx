import { motion } from 'framer-motion';

import styles from '../../styles';
import { staggerContainer, fadeIn, zoomIn } from '../../utils/motion';
import { stamp, testimonial_banner } from '../../assets/home';

const Feedback = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: 'false', amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col gap-6`}
    >
      <div className="flex lg:flex-row flex-col justify-between">
        <motion.div
          variants={fadeIn('right', 'tween', 0.2, 1)}
          className="flex-[0.5] flex justify-end flex-col gradient-05 sm:p-8 p-4 lg:mb-0 sm:mb-3 lg:mr-3 sm:mr-0 mr-5 rounded-[32px] border-[1px] border-[#6a6a6a] relative"
        >
          <div className="feedback-gradient" />
          <div>
            <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40px] leading-[36px] text-white">Elom Nusk</h4>
            <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22px] leading-[16px] text-white">Founder | SpaceZ</p>
          </div>
          <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45px] leading-[39px] text-white italic">
            "SwipeSetups is my go-to for finding the best gaming gear. I trust the community reviews and always get the latest info on the newest setups. Even got my dogecoin mining rig here, and equipment for the SpaceZ Mothership. Definitely #1 for trusted reviews and epic gaming setups."
          </p>
        </motion.div>
        <motion.div
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className="flex-[0.5] flex justify-end flex-col gradient-05 sm:p-8 p-4 lg:mt-0 sm:mt-3 lg:ml-3 sm:ml-0 ml-5 rounded-[32px] border-[1px] border-[#6a6a6a] relative"
        >
          <div className="feedback-gradient" />
          <div>
            <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40px] leading-[36px] text-white">Gill Bates</h4>
            <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22px] leading-[16px] text-white">Founder | Nitrosoft</p>
          </div>
          <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45px] leading-[39px] text-white italic">
            "Community ratings and reviews help gamers, traders, and programmers find the best gear. Our laptops are selling like hotcakes thanks to SwipeSetups. Kudos to the team for creating a fantastic platform and empowering users with informed purchasing decisions."
          </p>
        </motion.div>
      
      </div>
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        className="relative flex-1 flex justify-center items-center"
      >
        <img src={testimonial_banner} alt="testimonial banner" className="w-full lg:h-[610px] h-auto min-h-[210px] object-cover rounded-[40px]" />
        <motion.div
          variants={zoomIn(0.4, 1)}
          className="lg:block hidden absolute left-[80%] -top-[15%]"
        >
          <img src={stamp} alt="stamp" className="w-[155px] h-[155px] object-contain" />
        </motion.div>
      </motion.div>
    </motion.div>
  </section>
);

export default Feedback;
