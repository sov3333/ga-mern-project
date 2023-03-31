import {useState, useEffect} from 'react';
import {motion} from 'framer-motion';

import styles from '../../styles';
import {staggerContainer} from '../../utils/motion';
import {ExploreCard, TitleText, TypingText} from '../../components/home';

const Explore = () => {
  const [setups, setSetups] = useState([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/setup')
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (parsedData) => {
          setSetups(parsedData);
          setActive(`/setups/${parsedData[1]._id}`);
        },
        (err) => console.log(err)
      );
  }, []);

  return (
    <section className={`${styles.paddings}`} id='explore'>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{once: false, amount: 0.25}}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title='| Featured Desk Setups' textStyles='text-center' />
        <TitleText
          title={
            <>
              Top picks by <br className='md:block hidden' /> the community
            </>
          }
          textStyles='text-center'
        />
        <div className='mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5'>
          {setups.slice(0, 5).map((setup, index) => (
            <ExploreCard
              key={setup._id}
              {...setup}
              index={index}
              active={active}
              handleClick={setActive}
              slug={`/setups/${setup._id}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
