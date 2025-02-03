'use client';

import { useEffect, useState } from "react";
import CustomRenderer from "../../components/renderer"; // Component to render rich text content
import { useRouter } from "next/router"; // Hook for routing in Next.js
import { GET_POST } from "../../lib/queries"; // GraphQL query to fetch a single post
import client from "../../lib/apolloClient"; // Apollo Client instance

interface Post {
  title: string;
  author: string;
  publishedAt: string | null;
  body: {
    json: any;
  };
}

/**
 * PostDetail Component:
 * Displays the detailed view of a single blog post.
 * Fetches post data based on the slug from the URL using GraphQL.
 * Renders the post content using a custom rich text renderer.
 * Includes loading and error handling, and a back button to return to the post feed.
 */
export default function PostDetail() {
  const router = useRouter(); // useRouter hook from Next.js for accessing router object
  const { slug } = router.query; // Extract slug from the router query parameters
  const [post, setPost] = useState<Post | null>(null); // State to store the fetched post data
  const [loading, setLoading] = useState<boolean>(true); // Loading state for data fetching
  const [error, setError] = useState<string | null>(null); // Error state to display error messages

  // useEffect hook to fetch post data when the component mounts or slug changes
  useEffect(() => {
    if (!slug) return; // If slug is not available yet, do nothing (wait for router to be ready)

    setLoading(true); // Set loading to true before fetching data
    setError(null); // Clear any previous errors

    // Execute GraphQL query to fetch a single post by slug
    client
      .query({ query: GET_POST, variables: { slug } })
      .then(({ data }) => {
        if (data?.post) {
          setPost(data.post); // Update post state with fetched post data
        } else {
          setError("Post not found."); // Set error if post is not found
        }
      })
      .catch((err) => {
        setError(err.message); // Set error state with the error message if fetching fails
        console.error("GraphQL Error:", err); // Log the error for debugging
      })
      .finally(() => setLoading(false)); // Set loading to false after fetching is complete (success or fail)
  }, [slug]); // Dependency array: useEffect runs whenever slug changes

  // Loading state UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen"> {/* Full height centering container */}
        <p className="text-gray-700">Loading post...</p> {/* Loading message */}
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center"> {/* Container with padding and centering */}
        <p className="text-red-500 font-bold">{error}</p> {/* Error message in red, bold text */}
        <button onClick={() => router.back()} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> {/* Back button */}
          Go Back
        </button>
      </div>
    );
  }

  // Fallback UI when no post data is available (should not usually happen if no error)
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center"> {/* Container with padding and centering */}
        <p className="text-gray-500 italic">No post data available.</p> {/* Message indicating no post data */}
        <button onClick={() => router.back()} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> {/* Back button */}
          Go Back
        </button>
      </div>
    );
  }

  // Extract content JSON from post body
  const content = post.body.json;

  return (
    <div className="container mx-auto px-4 py-8"> {/* Main container with padding and centering */}
      <div className="max-w-3xl mx-auto"> {/* Limit content width and center it */}
        <article className="bg-white shadow-lg rounded-lg overflow-hidden"> {/* Article container styling */}
          {/* Post Header */}
          <header className="p-6"> {/* Header padding */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1> {/* Post title styling */}

            <div className="flex items-center justify-between text-sm text-gray-600"> {/* Author and date container */}
              <div className="flex items-center"> {/* Author info */}
                <span className="font-semibold">{post.author}</span> {/* Author name styling */}
              </div>

              <div className="flex items-center"> {/* Date info */}
                <span>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString() // Format published date
                    : "Not published"} {/* Display "Not published" if no published date */}
                </span>
              </div>
            </div>
          </header>

          {/* Post Content */}
          <div className="p-6 border-t border-gray-200"> {/* Content padding and top border */}
            {post.body.json && <CustomRenderer content={post.body.json} />} {/* Render rich text content using CustomRenderer */}
          </div>

          {/* Back Button */}
          <footer className="p-6 border-t border-gray-200 bg-gray-50"> {/* Footer padding, top border, and background */}
            <button onClick={() => router.back()} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> {/* Back button styling */}
              <svg viewBox="0 0 24 24" className="inline-block mr-2 align-middle h-5 w-5"> {/* Back arrow icon */}
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Posts
            </button>
          </footer>
        </article>
      </div>
    </div>
  );
}