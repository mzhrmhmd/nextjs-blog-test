"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GET_POSTS } from "../lib/queries"; // GraphQL query to fetch posts
import client from "../lib/apolloClient"; // Apollo Client instance

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string; // Ensure publishedAt is included in the Post interface
}

/**
 * PostFeed Component:
 * Fetches and displays a paginated list of blog posts in descending order of publication date.
 * Includes a hero section, post feed, and pagination controls.
 * Uses GraphQL to fetch data and Tailwind CSS for styling.
 */
export default function PostFeed() {
  // State variables to manage posts, loading, errors, pagination, etc.
  const [posts, setPosts] = useState<Post[]>([]); // Array to store fetched posts
  const [loading, setLoading] = useState<boolean>(true); // Loading state for data fetching
  const [error, setError] = useState<string | null>(null); // Error state to display error messages
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page number for pagination
  const [totalPosts, setTotalPosts] = useState<number>(0); // Total number of posts from the backend
  const postsPerPage = 5; // Number of posts to display per page

  // useEffect hook to fetch posts when the component mounts or currentPage changes
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Set loading to true before fetching data
      setError(null); // Clear any previous errors

      try {
        // Execute GraphQL query to fetch posts, now ordered by publishedAt_DESC
        const { data } = await client.query({
          query: GET_POSTS, // GraphQL query defined in queries.js (now ordered)
          variables: {
            first: postsPerPage, // Number of posts to fetch
            skip: (currentPage - 1) * postsPerPage, // Number of posts to skip based on current page
          },
        });

        // Process the data received from the GraphQL query
        if (data && data.posts) {
          setPosts(data.posts); // Update posts state with fetched posts
          setTotalPosts(data.postsConnection.aggregate.count); // Update total posts count for pagination
        } else {
          setError("No posts found."); // Set error if no posts are returned
        }
      } catch (err: any) {
        setError("Error fetching posts: " + err.message); // Set error if there's an issue fetching posts
        console.error("GraphQL Error:", err); // Log the error for debugging
      } finally {
        setLoading(false); // Set loading to false after fetching is complete, regardless of success or failure
      }
    };

    fetchPosts(); // Call the fetchPosts function
  }, [currentPage]); // Dependency array: useEffect runs whenever currentPage changes

  // Handler function for next page button click
  const handleNextPage = () => {
    if (currentPage * postsPerPage < totalPosts) {
      setCurrentPage(currentPage + 1); // Increment currentPage if there are more posts
    }
  };

  // Handler function for previous page button click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Decrement currentPage if it's not already on the first page
    }
  };

  // useEffect hook to reset to page 1 when the component is refreshed (mounts initially)
  useEffect(() => {
    setCurrentPage(1); // Reset currentPage to 1 on component mount
  }, []); // Empty dependency array: useEffect runs only once on component mount

  // Loading state UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen"> {/* Full height centering container */}
        <div className="text-gray-700">Loading posts...</div> {/* Loading message */}
      </div>
    );
  }

  // Error state UI
  if (error) {
    return <div className="text-red-500 p-4">{error}</div>; // Display error message in red text with padding
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10"> {/* Main container with max width and centering - MATCH HEADER WIDTH */}
      {/* Hero Section */}
      <section className="mb-8">
        <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center"> {/* Hero container styling */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the NextQL Blog</h1> {/* Hero title */}
          <p className="text-gray-600 mb-6"> {/* Hero description */}
            Explore the world of programming and machine learning. Stay updated with insightful articles, tutorials, and the latest trends in tech.
          </p>
          <Link href="/create-post" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> {/* Hero button */}
            Start Writing
          </Link>
        </div>
      </section>

      {/* Post Feed Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Posts</h2> {/* Section title */}
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p> // Message when no posts are available
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> {/* Grid layout for posts */}
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden"> {/* Post article styling */}
                <div className="p-6"> {/* Post content padding */}
                  <h2 className="text-xl font-bold text-gray-800 hover:text-blue-500 transition-colors duration-200"> {/* Post title */}
                    <Link href={`/posts/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mt-2 mb-4">{post.excerpt}</p> {/* Post excerpt */}
                  <Link href={`/posts/${post.slug}`} className="inline-flex items-center text-blue-500 hover:text-blue-700 font-semibold"> {/* Read more link */}
                    Read more →
                  </Link>
                  <p className="text-gray-500 text-sm mt-1">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : "Not published"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Pagination Section */}
      {totalPosts > postsPerPage && ( // Conditionally render pagination if there are more posts than postsPerPage
        <section className="mt-8 flex justify-center items-center space-x-4"> {/* Pagination container */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`py-2 px-4 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`} // Previous page button
          >
            Previous
          </button>
          <span className="text-gray-700"> {/* Page number display */}
            Page {currentPage} of {Math.ceil(totalPosts / postsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage * postsPerPage >= totalPosts}
            className={`py-2 px-4 rounded ${currentPage * postsPerPage >= totalPosts ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`} // Next page button
          >
            Next
          </button>
        </section>
      )}
    </div>
  );
}