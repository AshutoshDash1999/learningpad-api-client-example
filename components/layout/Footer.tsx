import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Users } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  version: string;
}

export default function Footer({ version }: FooterProps) {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Package Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Package Info
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Version: {version}</p>
              <p>Built with TanStack React Query & TypeScript</p>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Links</h3>
            <div className="space-y-2">
              <Button
                variant="link"
                size="sm"
                asChild
                className="h-auto p-0 justify-start"
              >
                <Link
                  href="https://www.learningpadedu.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>LearningPad Website</span>
                </Link>
              </Button>

              <Button
                variant="link"
                size="sm"
                asChild
                className="h-auto p-0 justify-start"
              >
                <Link
                  href="https://github.com/dibyajyoti79/lp-api-client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm"
                >
                  <Github className="h-3 w-3" />
                  <span>Package Repository</span>
                </Link>
              </Button>

              <Button
                variant="link"
                size="sm"
                asChild
                className="h-auto p-0 justify-start"
              >
                <Link
                  href="https://github.com/AshutoshDash1999/learningpad-api-client-example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm"
                >
                  <Github className="h-3 w-3" />
                  <span>Example Repository</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Issues & Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <Button
                variant="link"
                size="sm"
                asChild
                className="h-auto p-0 justify-start"
              >
                <Link
                  href="https://github.com/dibyajyoti79/lp-api-client/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm"
                >
                  <Github className="h-3 w-3" />
                  <span>Report Issues</span>
                </Link>
              </Button>

              <Button
                variant="link"
                size="sm"
                asChild
                className="h-auto p-0 justify-start"
              >
                <Link
                  href="https://github.com/dibyajyoti79/lp-api-client/issues/new?template=feature_request.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Request Feature</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Contributors */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Contributors</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-muted-foreground">Ashutosh Dash</span>
                <Button
                  variant="link"
                  size="sm"
                  asChild
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Link
                    href="https://github.com/AshutoshDash1999"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @AshutoshDash1999
                  </Link>
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">Dibyajyoti Mahuri</span>
                <Button
                  variant="link"
                  size="sm"
                  asChild
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Link
                    href="https://github.com/dibyajyoti79"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @dibyajyoti79
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 border-t pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 text-sm text-muted-foreground md:flex-row md:space-y-0">
            <p>© 2025 LearningPad. All rights reserved.</p>
            <p>Built with Next.js, TanStack React Query, and shadcn/ui</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
