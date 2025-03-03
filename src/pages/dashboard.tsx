import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI, dogsAPI } from "@/config/api";
import { useFilters } from "@/contexts/FilterContext";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { DogCard } from "./dogcard";
import { Navbar } from "@/components/custom/navbar";
import { AppSidebar } from "@/components/custom/app-sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SiCodemagic } from "react-icons/si";
import { FaWandMagicSparkles } from "react-icons/fa6";


import { PAGINATION_CONFIG } from "@/config/constants";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FaGithub } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { useSelectedDogs } from "../contexts/SelectedDogsContext";


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
  const filters = useFilters().filters;
  const { userName } = useAuth();
  const { selectedDogs , resetSelectedDogs } = useSelectedDogs();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMatch, setLoadingMatch] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE;

  const fetchDogs = async (pageNum: number = 1) => {
    try {
      setLoading(true);
      const filterParams: any = {
        size: pageSize,
        from: (pageNum - 1) * pageSize,
        sort: `${filters.sortBy}:${filters.sortOrder}`,
        ageMin: filters.minAge,
        ageMax: filters.maxAge,
      };
      const searchResults = await dogsAPI.searchDogs(filterParams);

      if (searchResults && searchResults.resultIds && searchResults.resultIds.length > 0) {
        const dogsData = await dogsAPI.getDogsByIds(searchResults.resultIds);
        setDogs(dogsData);

        const total = searchResults.total || 0;
        setTotalPages(Math.ceil(total / pageSize) || 1);
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

  useEffect(() => {
    const checkAuth = async () => {
      const { authenticated, error } = await authAPI.checkAuth();

      if (authenticated) {
        fetchDogs(1);
      } else {
        console.error("Authentication failed:", error);
        toast.error("Please login to access this page");
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    fetchDogs();
  }, [filters]);

  const handleFindMatch = async () => {
    if (selectedDogs.length === 0 || selectedDogs.length > 100) {
      toast.error("Unable to find a match. Please select at least one dog and ensure there are no more than 100 dogs selected.");
      return;
    }

    try {
      setMatchedDog(null);
      setLoadingMatch(true);
      const matchResponse = await dogsAPI.match(selectedDogs);
      const { match } =  matchResponse;
      const dogs = await dogsAPI.getDogsByIds([match]);
      console.log("Matched dog : ", dogs);
      if (dogs && dogs.length > 0) {
        setMatchedDog(dogs[0]);
      }
    } catch (error) {
      console.error("Error fetching match:", error);
      toast.error("Failed to find a match. Please try again.");
    } finally {
      setLoadingMatch(false);
    }
  };


  return (
    <>
    <AppSidebar />
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-8">
        <div className="flex items-center gap-x-2">
          <Dialog>
            <DialogTrigger className="h-8 w-full text-sm flex items-center bg-orange text-white gap-x-2" onClick={handleFindMatch}>Find a match <FaWandMagicSparkles /></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-x-2 mb-6">Here's your match <SiCodemagic /></DialogTitle>
                <DialogDescription>
                  {loadingMatch ? (
                    <Skeleton className="h-48 w-full" />
                  ) : matchedDog ? (
                    <DogCard dog={matchedDog} />
                  ) : (
                    <p>No match data available.</p>
                  )}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="w-full" onClick={resetSelectedDogs}>
            Reset Selected Dogs
          </Button>
        </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {loading
          ? Array(pageSize)
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
    </>
  )
}

export { Dashboard };