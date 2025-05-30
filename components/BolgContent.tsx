import { PortableText, PortableTextComponents } from "@portabletext/react";
import React, { ReactNode } from "react";

// Define custom block components for PortableText
const BlockComponents: PortableTextComponents = {
  block: {
    // Paragraphs (default block type)
    normal: ({ children }: { children?: ReactNode }) => (
      <p className="text-lg ">{children}</p>
    ),

    // Headings
    h1: ({ children }: { children?: ReactNode }) => (
      <h1 className="text-4xl font-bold text-primary font-cairo">{children}</h1>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 className="text-3xl font-semibold text-primary  ">{children}</h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className="text-2xl font-medium font-cairo">{children}</h3>
    ),

    // Blockquote
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },

  // Lists
  list: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <ul className="list-disc list-inside">{children}</ul>
    ),
    number: ({ children }: { children?: ReactNode }) => (
      <ol className="list-decimal list-inside">{children}</ol>
    ),
  },

  // List Items
  listItem: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <li className="ml-4  ">{children}</li>
    ),
    number: ({ children }: { children?: ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
  },

  // Code blocks
  types: {
    code: ({ value }: { value: { code: string } }) => (
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
        <code className="text-sm font-mono">{value.code}</code>
      </pre>
    ),
  },
};

// Blog Content Component
interface BlogContentProps {
  content: any;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  return <PortableText value={content} components={BlockComponents} />;
};

export default BlogContent;
