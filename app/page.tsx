"use client";

import {
  Balance,
  Container,
  Order,
  OrderBook,
  SelectMarket,
} from "@/components";

const Home = () => {
  return (
    <Container>
      <main className="pt-32 grid gap-4 grid-cols-1 lg:grid-cols-12 h-screen transition">
        <div className="lg:col-span-5 xl:col-span-4 bg-secondary dark:bg-secondaryDark rounded-xl lg:rounded-b-none lg:rounded-t-xl p-5">
          <SelectMarket />
          <div className="border border-primary dark:border-primaryDark w-full rounded-xl mt-10 mb-8" />
          <Balance />
          <div className="border border-primary dark:border-primaryDark w-full rounded-xl mt-10 mb-8" />
          <Order />
        </div>
        <div className="lg:col-span-7 xl:col-span-8 bg-secondary dark:bg-secondaryDark rounded-t-xl transition p-5">
          <OrderBook />
        </div>
      </main>
    </Container>
  );
};

export default Home;
