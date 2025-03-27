
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ProtectedLayout = ({ 
  children, 
  className 
}: ProtectedLayoutProps) => {
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className={cn(
      "min-h-screen bg-background flex flex-col",
      className
    )}>
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16">
          <h1 className="text-xl font-bold">JWT Auth Demo</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Logged in as {user?.name}
            </span>
            <Button variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        <div className="container">
          Symfony 7 JWT Authentication Example
        </div>
      </footer>
    </div>
  );
};

export default ProtectedLayout;
