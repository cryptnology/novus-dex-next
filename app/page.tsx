"use client";

import { Balance, Container, Order, SelectMarket } from "@/components";

const Home = () => {
  return (
    <Container>
      <main className="pt-32 grid grid-cols-12 h-screen transition">
        <div className="col-span-4 bg-secondary dark:bg-secondaryDark rounded-t-xl p-5">
          <SelectMarket />
          <div className="border border-primary dark:border-primaryDark w-full rounded-xl mt-10 mb-8" />
          <Balance />
          <div className="border border-primary dark:border-primaryDark w-full rounded-xl mt-10 mb-8" />
          <Order />
        </div>
      </main>
    </Container>
  );
};

export default Home;
