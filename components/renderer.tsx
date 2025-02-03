import { RichText } from "@graphcms/rich-text-react-renderer";
import Image from "next/image";

/**
 * CustomRenderer Component:
 * A component that renders rich text content from GraphCMS, providing custom styling and rendering
 * for various rich text elements using `@graphcms/rich-text-react-renderer`.
 * It enhances the default rendering by adding Tailwind CSS classes for improved UI and UX.
 */
const CustomRenderer = ({ content }) => {
  return (
    <RichText
      content={content}
      renderers={{
        /**
         * Custom renderer for anchor links (<a> tags).
         * Opens links in a new tab for external URLs and applies Tailwind CSS for styling.
         */
        a: ({ children, href, title }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
            className="text-blue-500 hover:underline" // Tailwind CSS for link styling
          >
            {children}
          </a>
        ),
        /**
         * Custom renderer for images (<img> tags).
         * Uses Next.js Image component for optimization and responsiveness.
         * Wraps the image in a <figure> element and optionally includes a <figcaption> for the title.
         */
        img: ({ src, altText, title }) => (
          <figure className="my-4"> {/* Tailwind CSS for figure margin */}
            <Image
              src={src}
              alt={altText || "Image"}
              title={title}
              width={700}
              height={475}
              className="rounded-md shadow-lg" // Tailwind CSS for rounded corners and shadow
            />
            {title && <figcaption className="text-sm text-gray-500 mt-2 italic">{title}</figcaption>} {/* Tailwind CSS for caption styling */}
          </figure>
        ),
        /**
         * Custom renderer for videos (<video> tags).
         * Includes video controls and an optional <track> for captions (title as label).
         */
        video: ({ src, title }) => (
          <div className="my-4"> {/* Tailwind CSS for video container margin */}
            <video controls className="rounded-md shadow-md w-full"> {/* Tailwind CSS for rounded corners, shadow, and width */}
              <source src={src} type="video/mp4" />
              {title && <track kind="captions" label={title} />}
              Your browser does not support the video tag.
            </video>
          </div>
        ),
        /**
         * Custom renderer for blockquotes (<blockquote> tags).
         * Applies Tailwind CSS for styling blockquotes.
         */
        blockquote: ({ children }) => (
          <blockquote className="pl-4 border-l-4 border-gray-300 italic my-4"> {/* Tailwind CSS for blockquote styling */}
            {children}
          </blockquote>
        ),
        /**
         * Custom renderers for headings (<h1> to <h6> tags).
         * Applies Tailwind CSS for different heading levels.
         */
        h1: ({ children }) => <h1 className="text-4xl font-bold mt-6 mb-4 text-gray-800">{children}</h1>, // Tailwind CSS for h1 styling
        h2: ({ children }) => <h2 className="text-3xl font-semibold mt-6 mb-4 text-gray-800">{children}</h2>, // Tailwind CSS for h2 styling
        h3: ({ children }) => <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">{children}</h3>, // Tailwind CSS for h3 styling
        h4: ({ children }) => <h4 className="text-xl font-semibold mt-4 mb-2 text-gray-700">{children}</h4>, // Tailwind CSS for h4 styling
        h5: ({ children }) => <h5 className="text-lg font-semibold mt-4 mb-2 text-gray-600">{children}</h5>, // Tailwind CSS for h5 styling
        h6: ({ children }) => <h6 className="text-base font-semibold mt-4 mb-2 text-gray-600">{children}</h6>, // Tailwind CSS for h6 styling
        /**
         * Custom renderer for paragraphs (<p> tags).
         * Applies Tailwind CSS for paragraph styling.
         */
        p: ({ children }) => <p className="mb-4 text-gray-700">{children}</p>, // Tailwind CSS for paragraph styling
        /**
         * Custom renderer for unordered lists (<ul> tags).
         * Applies Tailwind CSS for list styling.
         */
        ul: ({ children }) => <ul className="list-disc list-inside my-4">{children}</ul>, // Tailwind CSS for unordered list styling
        /**
         * Custom renderer for ordered lists (<ol> tags).
         * Applies Tailwind CSS for list styling.
         */
        ol: ({ children }) => <ol className="list-decimal list-inside my-4">{children}</ol>, // Tailwind CSS for ordered list styling
        /**
         * Custom renderer for list items (<li> tags).
         * Applies Tailwind CSS for list item styling.
         */
        li: ({ children }) => <li className="mb-2">{children}</li>, // Tailwind CSS for list item styling
        /**
         * Custom renderer for tables (<table> tags).
         * Applies Tailwind CSS for basic table styling.
         */
        table: ({ children }) => <table className="table-auto w-full my-4 border-collapse border border-gray-200">{children}</table>, // Tailwind CSS for table styling
        /**
         * Custom renderer for table headers (<thead> tags).
         */
        table_head: ({ children }) => <thead className="bg-gray-100">{children}</thead>, // Tailwind CSS for table header styling
        /**
         * Custom renderer for table header cells (<th> tags).
         */
        table_header_cell: ({ children }) => <th className="border border-gray-200 px-4 py-2 font-semibold text-gray-700">{children}</th>, // Tailwind CSS for table header cell styling
        /**
         * Custom renderer for table bodies (<tbody> tags).
         */
        table_body: ({ children }) => <tbody className="text-sm">{children}</tbody>, // Tailwind CSS for table body styling
        /**
         * Custom renderer for table rows (<tr> tags).
         */
        table_row: ({ children }) => <tr className="hover:bg-gray-50">{children}</tr>, // Tailwind CSS for table row styling
        /**
         * Custom renderer for table cells (<td> tags).
         */
        table_cell: ({ children }) => <td className="border border-gray-200 px-4 py-2 text-gray-600">{children}</td>, // Tailwind CSS for table cell styling
        /**
         * Custom renderer for bold text (<strong> tags).
         * Applies Tailwind CSS for bold text styling (though default <strong> is already bold).
         */
        bold: ({ children }) => <strong className="font-bold">{children}</strong>, // Tailwind CSS for bold text styling (redundant but kept for consistency if customization needed)
        /**
         * Custom renderer for italic text (<em> tags).
         * Applies Tailwind CSS for italic text styling (though default <em> is already italic).
         */
        italic: ({ children }) => <em className="italic">{children}</em>, // Tailwind CSS for italic text styling (redundant but kept for consistency if customization needed)
        /**
         * Custom renderer for underlined text (<span> tags for underline).
         * Applies Tailwind CSS for underline styling.
         */
        underline: ({ children }) => <span className="underline">{children}</span>, // Tailwind CSS for underline styling
        /**
         * Custom renderer for inline code (<code> tags).
         * Applies Tailwind CSS for inline code styling.
         */
        code: ({ children }) => <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm text-red-600">{children}</code>, // Tailwind CSS for inline code styling
        /**
         * Custom renderer for code blocks (<pre><code> tags).
         * Applies Tailwind CSS for code block styling, including background, padding, rounded corners, and font.
         */
        code_block: ({ children }) => (
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto my-4"> {/* Tailwind CSS for code block styling */}
            <code className="font-mono text-sm">{children}</code>
          </pre>
        ),
      }}
    />
  );
};

export default CustomRenderer;