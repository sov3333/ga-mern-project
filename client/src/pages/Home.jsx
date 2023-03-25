import React from 'react';
import { About, Explore, Feedback, FeaturesHow, Hero, Reviews, FeaturesWhy, World } from '../sections/home';

const Home = () => {
  return (
    <div className="bg-primary-black overflow-hidden">
        <Hero />
        <div className="relative">
          <About />
          <div className="gradient-03 z-0" />
          <Explore />
        </div>
        <div className="relative">
          <FeaturesHow />
          <div className="gradient-04 z-0" />
          <FeaturesWhy />
        </div>
        <World />
        <div className="relative">
          <Reviews />
          <div className="gradient-04 z-0" />
          <Feedback />
        </div>
    </div>
  )
}

export default Home