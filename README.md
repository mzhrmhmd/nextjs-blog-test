Here's a `README.md` for your GitHub repository, merging the necessary details into one file:

```markdown
# NextJS Blog Test - A Next.js & GraphQL Blog Application

## Overview

This is a simple yet functional blog application built with **Next.js** and **GraphQL**. The app allows users to browse a list of blog posts, read individual posts in detail, and create new blog posts via a user-friendly form. The application is styled with **Tailwind CSS** and makes use of **Apollo Client** for data fetching and **TypeScript** for improved development.

## Technologies Used

- **Next.js** (v14) - React framework for building fast, server-rendered web applications.
- **Apollo Client** (v3) - Comprehensive GraphQL client to manage data fetching and state.
- **GraphCMS (Hygraph)** - Headless CMS for content management, providing a flexible GraphQL API.
- **Tailwind CSS** (v3) - Utility-first CSS framework for designing responsive interfaces.
- **TypeScript** (v5) - Adds static typing to JavaScript, enhancing maintainability and reducing errors.
- **slugify** (v1) - Utility for generating clean, URL-friendly slugs from post titles.
- **next/font/local** - Optimizes and loads local fonts for performance.

## Features

- **Post Listing with Pagination**: Browse a paginated list of blog posts.
- **Individual Post View**: Read full blog posts with rich text formatting.
- **Create Post**: A form to create and publish new blog posts with validation.
- **SEO-Friendly URLs**: Each blog post has a clean URL based on its title.
- **Responsive Design**: The layout adapts for both desktop and mobile devices.

## Project Architecture

### Pages

- **`pages/_app.tsx`**: Global layout including fonts, styles, and Apollo Client provider.
- **`pages/index.tsx`**: The homepage displaying a list of blog posts.
- **`pages/create-post.tsx`**: Form for creating new blog posts.
- **`pages/posts/[slug].tsx`**: Dynamic route for viewing individual posts.

### Components

- **`components/header.tsx`**: Website header with logo and navigation.
- **`components/footer.tsx`**: Footer with social links and contact details.
- **`components/post-feed.tsx`**: Displays the list of blog posts with pagination.
- **`components/renderer.tsx`**: Custom renderer for rich text content from GraphCMS.
- **`components/create-post.tsx`**: Form component for creating blog posts.

### Lib

- **`lib/apolloClient.ts`**: Configures Apollo Client for GraphQL queries and mutations.
- **`lib/queries.ts`**: Contains all GraphQL queries and mutations.

### Styling

- **`globals.css`**: Global styles including Tailwind CSS configuration.

## Setup Instructions

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/mzhrmhmd/nextjs-blog-test.git
   ```

2. Navigate to the project folder:

   ```bash
   cd nextjs-blog-test
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Create a `.env.local` file and add your GraphCMS endpoint and credentials:

   ```env
   NEXT_PUBLIC_GRAPH_CMS_URL=<your_graphcms_endpoint>
   ```

5. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open your browser and go to `http://localhost:3000` to see the app.

## Deployment

For easy deployment, use **Vercel**, the platform created by the authors of Next.js:

1. Push the project to GitHub.
2. Sign up or log into [Vercel](https://vercel.com).
3. Connect the repository to Vercel and follow the instructions to deploy.

## Learn More

- **[Next.js Documentation](https://nextjs.org/docs)**: Learn more about Next.js features and API.
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)**: Learn how to use Tailwind CSS.
- **[Apollo Client Documentation](https://www.apollographql.com/docs/react/)**: Learn how to work with GraphQL APIs using Apollo Client.

## Conclusion

The **NextJS Blog Test** demonstrates the use of **Next.js**, **GraphQL**, and **Tailwind CSS** to build a simple and responsive blog platform. With features like post pagination, individual post views, and a user-friendly post creation form, the app provides the core functionality of a blogging platform. The use of **Apollo Client** allows for efficient GraphQL interactions, and **TypeScript** ensures maintainable, error-free code.

Feel free to explore the repository, and if you have any questions, open an issue or reach out!

---

**GitHub Repository**: [NextJS Blog Test](https://github.com/mzhrmhmd/nextjs-blog-test)
```
