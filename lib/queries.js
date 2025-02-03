import { gql } from "@apollo/client";

// GraphQL query to fetch a single post by its slug.
export const GET_POST = gql`
  query GetPostBySlug($slug: String!) {
    post(where: {slug: $slug}) {
      author
      body {
        json
        markdown
        text
        html
      }
      excerpt
      id
      publishedAt
      slug
      title
    }
  }
`;

// Fetch all posts, now ordered by publishedAt in descending order
export const GET_POSTS = gql`
  query GetPostsList($first: Int, $skip: Int) {
    posts(last: $first, skip: $skip, orderBy: publishedAt_DESC) { # ADDED orderBy: publishedAt_DESC
      excerpt
      id
      publishedAt
      slug
      title
      author
    }
    postsConnection {
      aggregate {
        count
      }
    }
  }
`;

// GraphQL mutation to create a new post and immediately publish it.
// Requires post data as input (`$data`), a unique identifier for publishing (`$where`),
// and the target publication stages (`$to`, typically ["PUBLISHED"]).
export const CREATE_POST = gql`
  mutation CreatePostMutation($data: PostCreateInput!, $where: PostWhereUniqueInput!, $to: [Stage!]!) { # Renamed mutation for clarity
    createPost(data: $data) {
      title
      slug
      excerpt
      author
      body {
        json # Only requesting json as it seems to be the primary format used
      }
    }
    publishPost(where: $where, to: $to) {
      slug
      stage
    }
  }
`;