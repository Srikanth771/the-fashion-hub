import React from "react";

import Category from "../pages/Categories";
import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
import NewArrivals from "../components/home/NewArrivals";
import Trending from "../components/home/Trending";
import FlashDeals from "../components/home/FlashDeals";
import BestSellers from "../components/home/BestSeller";

const Home = () => {
  return (
    <div>

      {/* Category + Hero */}

      <section className="max-w-[1500px] mx-auto mt-4">

        <div className="flex gap-0">

          <Category />

          <Hero />

          
        </div>

      </section>
      <CategorySection />
      <NewArrivals/>
      <Trending/>
      <FlashDeals/>
      <BestSellers/>
      



    </div>
  );
};

export default Home;