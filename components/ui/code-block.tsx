"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "bash",
  className = "",
}: CodeBlockProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout: 2000,
  });
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: "github-dark",
          transformers: [
            {
              name: "remove-background",
              pre(node) {
                node.properties.style =
                  "background: transparent; padding: 0; margin: 0;";
              },
              code(node) {
                node.properties.style =
                  "background: transparent; padding: 0; margin: 0;";
              },
            },
          ],
        });

        setHighlightedCode(html);
      } catch (error) {
        console.error("Error highlighting code:", error);
        // Fallback to plain text if highlighting fails
        setHighlightedCode(`<pre><code>${code}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };

    highlightCode();
  }, [code, language]);

  if (isLoading) {
    return (
      <div className={`relative group ${className}`}>
        <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm">
          <code>{code}</code>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => copyToClipboard(code)}
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <div
        className="bg-gray-900 p-4 rounded-md text-sm overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-700"
        onClick={() => copyToClipboard(code)}
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-gray-300" />
        )}
      </Button>
    </div>
  );
}
