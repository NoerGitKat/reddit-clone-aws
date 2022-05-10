import { CircularProgress } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Post } from "../API";
import { PostPreview } from "../components";
import { useAuth } from "../context/AuthContex";
import { fetchPosts } from "../requests";

const Home: NextPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  const { data, isLoading } = useQuery(["posts"], fetchPosts);

  useEffect(() => {
    const listPosts = data?.data.listPosts?.items as Post[];
    if (data && listPosts) {
      setPosts(listPosts);
    } else {
      setPosts([]);
    }
  }, [data]);

  return (
    <main>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <main>
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostPreview
                key={post.id}
                owner={post.owner || ""}
                title={post.title}
                createdAt={post.createdAt}
              />
            ))
          ) : (
            <p>No posts yet!</p>
          )}
        </main>
      )}
    </main>
  );
};

export default Home;
