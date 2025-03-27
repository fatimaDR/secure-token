
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
  redirectAuthenticated?: boolean;
}

const AuthLayout = ({ 
  children, 
  className,
  redirectAuthenticated = false 
}: AuthLayoutProps) => {
  const { isAuthenticated } = useAuth();

  // If user is authenticated and we want to redirect authenticated users
  if (redirectAuthenticated && isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col",
      className
    )}>
      <header className="p-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex items-center justify-center">
          <h1 className="text-xl font-bold text-blue-700">JWT Auth Demo</h1>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-gray-500 border-t bg-white/80 backdrop-blur-sm">
        <div className="container">
          Symfony 7 JWT Authentication Example
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
