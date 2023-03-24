import React from 'react';
import { Footer, Navbar } from '../components/home';
import { About, Explore, Feedback, FeaturesHow, Hero, Reviews, FeaturesWhy, World } from '../sections/home';

const NewHome = () => {
  return (
    <div className="bg-primary-black overflow-hidden">
        <Navbar />
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
        <Footer />
    </div>
  )
}

export default NewHome