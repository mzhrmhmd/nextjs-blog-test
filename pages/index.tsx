import PostFeed from "../components/post-feed"; // Import without '.tsx'

/**
 * Home Component:
 * The main homepage component of the blog application.
 * It is responsible for rendering the PostFeed component, which displays a list of blog posts.
 * This component acts as the entry point for users to view the blog content.
 */
export default function Home() {
  return (
    <div>
      {/*
          Post Feed Section:
          Renders the PostFeed component to display a paginated list of blog posts.
          The PostFeed component handles fetching and displaying posts from the backend.
          See the PostFeed component documentation for details on its functionality.
        */}
      <PostFeed />
    </div>
  );
}