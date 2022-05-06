import type { NextPage } from "next";
import { useAuth } from "../context/AuthContex";

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <main>hello</main>
    </div>
  );
};

export default Home;
