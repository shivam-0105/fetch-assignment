import { useAuth } from "@/context/AuthContext";

import { Avatar, AvatarFallback } from "../ui/avatar";


const Navbar = () => {
  const { userName } = useAuth();

  return (
    <div className="flex justify-end items-center mb-8">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback className="transition hover:bg-orange-400 hover:text-white">
            {userName?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export { Navbar };