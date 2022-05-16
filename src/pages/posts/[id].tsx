import { withSSRContext } from "aws-amplify";
import { GetStaticPaths, GetStaticProps } from "next";
import { GetPostQuery, ListPostsQuery, Post } from "../../API";
import { getPost, listPosts } from "../../graphql/queries";

export interface ISinglePostProps {
  post: Post;
}

export default function SinglePost(props: ISinglePostProps) {
  console.log("props is", props);
  return <div>hello</div>;
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { API } = withSSRContext(context);

  let postsQuery;
  try {
    postsQuery = (await API.graphql({
      query: getPost,
      authMode: "API_KEY",
      variables: {
        id: context.params!.id,
      },
    })) as { data: GetPostQuery };
  } catch (error) {
    console.error("Error!", error);
  }

  return {
    props: {
      post: postsQuery ? (postsQuery.data.getPost as Post) : {},
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { API } = withSSRContext(context);

  let response,
    paths = [{}];
  try {
    response = (await API.graphql({
      query: listPosts,
      authMode: "API_KEY",
    })) as { data: ListPostsQuery };

    if (response) {
      paths = response.data!.listPosts!.items.map((post) => ({
        params: { id: post?.id },
      }));
    }
  } catch (error) {
    console.error("Error!", error);
  }

  return { paths, fallback: "blocking" };
};
