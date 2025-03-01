import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/config/api";

import { Avatar, AvatarFallback } from "./avatar";
import { Button } from "./button";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const { userName } = useAuth();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout properly");
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Dog Finder Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback className="transition hover:bg-orange-400 hover:text-white">
            {userName?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Button className="bg-orange" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export { Navbar };