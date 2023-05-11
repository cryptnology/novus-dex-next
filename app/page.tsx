"use client";

import { Balance, Container } from "@/components";

const Home = () => {
  return (
    <Container className="">
      <main className="pt-32 text-dark dark:text-light transition">
        <Balance />
      </main>
    </Container>
  );
};

export default Home;
