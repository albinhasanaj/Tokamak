import Post from "@/components/Post";
import React from "react";

const Home = () => {
  return (
    <main className="flex mx-auto gap-20 mt-20 flex-col">
      <Post />
      <Post />
    </main>
  );
};

export default Home;
