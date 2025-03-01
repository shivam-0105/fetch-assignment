import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, dogsAPI } from "@/config/api";
import { useAuth } from "@/context/AuthContext";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { DogCard } from "./dogcard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { userName } = useAuth();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchDogs = async (pageNum: number = 1) => {
    try {
      setLoading(true);

      const searchResults = await dogsAPI.searchDogs({
        size: 12,
        from: (pageNum - 1) * 12,
        sort: "breed:asc",
      });

      console.log("Search response:", searchResults);

      if (searchResults && searchResults.resultIds && searchResults.resultIds.length > 0) {
        const dogsData = await dogsAPI.getDogsByIds(searchResults.resultIds);
        setDogs(dogsData);

        const total = searchResults.total || 0;
        setTotalPages(Math.ceil(total / 12) || 1);
      } else {
        setDogs([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching dogs:", error);
      toast.error("Failed to fetch dogs. You may need to log in again.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    const checkAuth = async () => {
      const { authenticated, error } = await authAPI.checkAuth();

      if (authenticated) {
        console.log("User is authenticated, fetching dogs");
        fetchDogs(1);
      } else {
        console.error("Authentication failed:", error);
        toast.error("Please login to access this page");
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="container mx-auto py-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array(12)
            .fill(0)
            .map((_, index) => (
              <Card key={`skeleton-${index}`} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
          : dogs.map((dog) => (
            <DogCard dog={dog} />
          ))}
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setPage((prev) => Math.max(prev - 1, 1));
              fetchDogs(page - 1);
            }}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => {
              setPage((prev) => Math.min(prev + 1, totalPages));
              fetchDogs(page + 1);
            }}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

export { Dashboard };