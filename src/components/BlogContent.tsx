import { useEffect, useState, type ReactNode, HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import type { BlogPost } from "@/data/blog-posts";

interface BlogContentProps {
  post: BlogPost;
}

export function BlogContent({ post }: BlogContentProps) {
  useEffect(() => {
    // Add IDs to headings for table of contents navigation
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    post.headings.forEach((heading, index) => {
      if (headings[index]) {
        headings[index].id = heading.id;
      }
    });
  }, [post]);
  const CodeBlock = (
    {
      node,
      inline,
      className,
      children,
      ...props
    }: {
      node?: unknown;
      inline?: boolean;
      className?: string;
      children: ReactNode;
    } & HTMLAttributes<HTMLElement>
  ) => {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    };

    return !inline && match ? (
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="absolute right-2 top-2 rounded bg-muted p-1 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={`${className} bg-muted px-1.5 py-0.5 rounded text-sm font-mono`} {...props}>
        {children}
      </code>
    );
  };

  return (
    <div className="flex-1 min-w-0 max-w-4xl mx-auto px-4 md:px-8 py-4 md:py-8 overflow-y-auto">
      <div className="prose prose-sm md:prose-lg max-w-none">
        <ReactMarkdown
          components={{
            code: CodeBlock,
            h1: ({ children }) => (
              <h1 className="text-4xl font-bold text-foreground mb-6 mt-8 first:mt-0">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-3xl font-semibold text-foreground mb-4 mt-8 border-b border-border pb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl font-semibold text-foreground mb-3 mt-6">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-xl font-semibold text-foreground mb-2 mt-4">
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="text-foreground leading-7 mb-4">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="text-foreground space-y-2 mb-4 ml-6 list-disc">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="text-foreground space-y-2 mb-4 ml-6 list-decimal">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-foreground">
                {children}
              </li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a 
                href={href} 
                className="text-primary hover:text-primary/80 underline transition-colors"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse border border-border">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-border px-4 py-2">
                {children}
              </td>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}