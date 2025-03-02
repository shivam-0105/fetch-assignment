import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";


const Navbar = () => {
  const { userName } = useAuth();

  return (
    <div className="flex justify-end items-center mb-8">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback className="transition hover:bg-orange hover:text-white">
            {userName?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Link
          to="https://github.com/shivam-0105/fetch-assignment" target="_blank" className="text-foreground hover:text-foreground">
          <Button
            variant="outline"
            className="w-full transition hover:bg-orange hover:border-orange rounded-full">
            <FaGithub />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export { Navbar };