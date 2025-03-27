
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ProtectedLayout from "@/components/layouts/ProtectedLayout";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tokenInfo, setTokenInfo] = useState({
    token: "",
    expiry: "",
  });

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token") || "";
    if (token) {
      try {
        // For demo purposes only - not for production!
        // In reality, you should never decode JWT tokens on the client
        // This is just to show the token structure for educational purposes
        const tokenParts = token.split(".");
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          const expiryDate = payload.exp ? new Date(payload.exp * 1000).toLocaleString() : "N/A";
          setTokenInfo({
            token: token.substring(0, 20) + "...",
            expiry: expiryDate,
          });
        }
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <ProtectedLayout>
      <div className="container max-w-4xl py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.name}!</CardTitle>
            <CardDescription>
              You've successfully logged in with JWT authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Your account information:</h3>
              <ul className="mt-2 space-y-2">
                <li><span className="font-medium">Email:</span> {user?.email}</li>
                <li><span className="font-medium">User ID:</span> {user?.id}</li>
              </ul>
            </div>
            
            <div className="p-4 mt-4 border rounded-md bg-muted/50">
              <h3 className="text-lg font-medium">Your JWT Token:</h3>
              <div className="p-2 mt-2 overflow-x-auto font-mono text-sm bg-background rounded-md">
                {tokenInfo.token}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium">Token Expiry:</span> {tokenInfo.expiry}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Note: In a real application, tokens are automatically refreshed in the background.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </CardFooter>
        </Card>
      </div>
    </ProtectedLayout>
  );
};

export default Dashboard;
