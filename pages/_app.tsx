import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";

// Define the Geist Sans font using next/font/local
const geistSans = localFont({
  src: "./fonts/GeistVF.woff", // Path to the font file
  variable: "--font-geist-sans", // CSS variable name for the font family
  weight: "100 900", // Font weights to include (variable font range)
  display: "swap", // Font display strategy for performance
});

// Define the Geist Mono font using next/font/local
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff", // Path to the font file
  variable: "--font-geist-mono", // CSS variable name for the font family
  weight: "100 900", // Font weights to include (variable font range)
  display: "swap", // Font display strategy for performance
});

/**
 * App Component:
 * The root component for the Next.js application, defining the global layout and providers.
 * It sets up the application-wide structure including header, footer, main content area,
 * font configurations, global styles, and Apollo Client provider for GraphQL data fetching.
 */
export default function App({ Component, pageProps }: { Component: React.ElementType, pageProps: any }) {
  return (
    // ApolloProvider to make the Apollo Client instance available to all components in the app
    <ApolloProvider client={client}>
      {/* Apply Geist Sans font globally and Geist Mono as a variable font */}
      <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        {/* Header component - typically for site navigation and branding */}
        <Header />

        {/* Main content area where page components will be rendered */}
        <main>
          <Component {...pageProps} /> {/* Render the current page component and pass page properties */}
        </main>

        {/* Footer component - typically for site information, links, and copyright */}
        <Footer />
      </div>
    </ApolloProvider>
  );
}