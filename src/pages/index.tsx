import { Button, CircularProgress, Container } from "@mui/material";
import { Auth } from "aws-amplify";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Post } from "../API";
import { PostPreview } from "../components";
import { useAuth } from "../context/AuthContext";
import { fetchPosts } from "../requests";

const Home: NextPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(["posts"], fetchPosts);

  useEffect(() => {
    const listPosts = data?.data.listPosts?.items as Post[];
    if (data && listPosts) {
      setPosts(listPosts);
    } else {
      setPosts([]);
    }
  }, [data]);

  async function signOut() {
    try {
      await Auth.signOut({ global: true });
      queryClient.resetQueries("posts", { exact: true });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <main>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Container maxWidth="md">
          {user && (
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={signOut}
            >
              Sign out!
            </Button>
          )}
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostPreview
                key={post.id}
                id={post.id}
                owner={post.owner || ""}
                title={post.title}
                contents={post.contents}
                image={post.image}
                createdAt={post.createdAt}
                upvotes={post.upvotes}
                downvotes={post.downvotes}
              />
            ))
          ) : (
            <p>No posts yet!</p>
          )}
        </Container>
      )}
    </main>
  );
};

export default Home;
