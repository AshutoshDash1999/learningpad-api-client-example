"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { ArrowLeft, Copy, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    onCopy: () => toast.success("LLM context copied to clipboard!"),
  });
  const [llmContext, setLlmContext] = useState<string>("");

  useEffect(() => {
    // Fetch the llm.txt content on mount
    fetch("/docs/llm.txt")
      .then((res) => res.text())
      .then((text) => setLlmContext(text))
      .catch((err) => console.error("Failed to load LLM context:", err));
  }, []);

  const handleCopyLLMContext = () => {
    if (llmContext) {
      copyToClipboard(llmContext);
    } else {
      toast.error("LLM context not loaded yet");
    }
  };

  const handleBack = () => {
    router.back();
  };

  const isMainPage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left side - Back button and Logo */}
        <div className="flex items-center space-x-4">
          {!isMainPage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          )}

          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="LearningPad Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="text-lg font-semibold">
              LearningPad API Client
            </span>
          </Link>
        </div>

        {/* Right side - External links */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyLLMContext}
            disabled={isCopied || !llmContext}
            className="flex items-center space-x-2"
            title="Copy LLM context to clipboard"
          >
            <Copy className="h-4 w-4" />
            <span className="hidden sm:inline">
              {isCopied ? "Copied!" : "Copy LLM Context"}
            </span>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link
              href="https://www.learningpadedu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">LearningPad</span>
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link
              href="https://github.com/dibyajyoti79/lp-api-client"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">Package</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
