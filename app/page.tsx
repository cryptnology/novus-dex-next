"use client";

import { Balance, Container, SelectMarket } from "@/components";

const Home = () => {
  return (
    <Container>
      <main className="pt-32 grid grid-cols-12 h-screen transition">
        <div className="col-span-4 bg-secondary dark:bg-secondaryDark rounded-t-xl p-5">
          <SelectMarket />
          <div className="border border-primary dark:border-primaryDark w-full rounded-xl my-10" />
          <Balance />
        </div>
      </main>
    </Container>
  );
};

export default Home;
