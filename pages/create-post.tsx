import { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../lib/queries'; // GraphQL mutation to create a post
import slugify from 'slugify'; // Library to generate slugs from titles

interface PostData {
  title: string;
  slug: string;
  author: string;
  excerpt: string;
  body: {
    children: { type: string; children: { text: string }[] }[];
  };
}

/**
 * CreatePost Component:
 * A form component to create and publish a new blog post.
 * It uses GraphQL mutation to interact with the backend and Tailwind CSS for styling.
 */
export default function CreatePost() {
  // State variables to manage form inputs and component state
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [excerpt, setExcerpt] = useState<string>('');
  const [error, setError] = useState<string>(''); // State to hold error messages
  const [loading, setLoading] = useState<boolean>(false); // State to indicate loading status

  // useMutation hook from @apollo/client to execute the CREATE_POST mutation
  const [createPost] = useMutation(CREATE_POST);

  /**
   * handleSubmit:
   * Handles the form submission event.
   * Prevents default form submission, validates input fields,
   * generates a slug, prepares post data, and executes the CREATE_POST mutation.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear any previous errors
    setLoading(true); // Set loading state to true

    // Input validation: Check if required fields are filled
    if (!title || !author || !body || !excerpt) {
      setError('Title, author, body, and excerpt are required.');
      setLoading(false); // Reset loading state
      return; // Stop further execution
    }

    // Generate a slug from the title using slugify library
    const slug = slugify(title, { lower: true, strict: true });

    // Prepare the post data object to be sent to the GraphQL mutation
    const postData: PostData = {
      title,
      slug,
      author,
      excerpt,
      body: {
        children: [{ type: 'paragraph', children: [{ text: body }] }], // Structure body content as a paragraph
      },
    };

    try {
      // Execute the CREATE_POST mutation with post data and slug as variables
      const { data } = await createPost({
        variables: {
          data: postData,
          where: { slug }, // Specify where condition if needed (e.g., for updates, though not used for creation in this example)
          to: ["PUBLISHED"], // Specify the desired state transition (publishing in this case)
        },
      });

      // Reset form fields after successful post creation
      setTitle('');
      setAuthor('');
      setBody('');
      setExcerpt('');
      alert('Post created and published successfully!'); // Provide success feedback to the user
    } catch (err: any) {
      console.error('GraphQL Error:', err);
      setError(err?.graphQLErrors?.[0]?.message || 'Failed to create and publish the post.'); // Set error message from GraphQL response or a generic message
    } finally {
      setLoading(false); // Reset loading state in finally block to ensure it's always reset
    }
  };

  // Event handler for title input change
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Event handler for author input change
  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  // Event handler for body textarea change
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  // Event handler for excerpt textarea change
  const handleExcerptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExcerpt(e.target.value);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8"> {/* Container with max width, centered, and padding */}
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Create and Publish a New Post</h1> {/* Main heading */}
      <p className="text-gray-600 mb-6">Fill out the form below to create a post. All fields are required.</p> {/* Subheading/instruction */}

      <form onSubmit={handleSubmit} className="space-y-4"> {/* Form element with vertical spacing */}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"> {/* Error message display */}
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-1">{error}</span>
        </div>}

        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2"> {/* Label for title input */}
            Post Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter your post title"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Tailwind styling for input
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2"> {/* Label for author input */}
            Author Name
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={handleAuthorChange}
            placeholder="Enter the author's name"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Tailwind styling for input
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-gray-700 text-sm font-bold mb-2"> {/* Label for excerpt textarea */}
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={handleExcerptChange}
            placeholder="Provide a short excerpt for the post"
            required
            rows={3}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none" // Tailwind styling for textarea, fixed height and disable resize
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2"> {/* Label for body textarea */}
            Post Content
          </label>
          <textarea
            id="body"
            value={body}
            onChange={handleBodyChange}
            placeholder="Write the full content of your post"
            required
            rows={6}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48 resize-vertical" // Tailwind styling for textarea, fixed height and vertical resize
          />
        </div>

        <div className="flex items-center justify-between"> {/* Container for button and potential other elements */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-wait' : ''}`} // Tailwind styling for button, disabled state styling
          >
            {loading ? 'Creating and Publishing...' : 'Create and Publish Post'} {/* Button text based on loading state */}
          </button>
        </div>
      </form>
    </div>
  );
}