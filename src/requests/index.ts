import { API, graphqlOperation } from "aws-amplify";
import { ListPostsQuery } from "../API";
import { listPosts } from "../graphql/queries";

export const fetchPosts = async () =>
  (await API.graphql(graphqlOperation(listPosts))) as {
    data: ListPostsQuery;
    errors: any[];
  };
