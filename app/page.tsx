"use client";

import { Balance, Container, SelectMarket } from "@/components";

const Home = () => {
  return (
    <Container className="">
      <main className="pt-32 text-dark dark:text-light transition">
        <SelectMarket />
        <Balance />
      </main>
    </Container>
  );
};

export default Home;
