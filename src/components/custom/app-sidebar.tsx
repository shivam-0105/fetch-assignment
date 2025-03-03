import { useState, useEffect } from "react"
import { authAPI, dogsAPI } from "@/config/api"
import { useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { MdOutlineLogout } from "react-icons/md"
import { PiPawPrintFill } from "react-icons/pi"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input"
import { useFilters } from "@/contexts/FilterContext";
import { MdFilterAlt } from "react-icons/md";
import { MultiSelect } from "./multi-select"

export interface FilterParams {
  sortBy: string;
  sortOrder: string;
  minAge: number;
  maxAge: number;
  breeds: string[]; // Added breeds to filters
}

export interface AppSidebarProps {
  onFilterChange?: (params: FilterParams) => void;
}

export function AppSidebar({ onFilterChange }: AppSidebarProps) {
  const navigate = useNavigate();
  const { updateFilters } = useFilters();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterParams>({
    minAge: 1,
    maxAge: 100,
    sortBy: "breed",
    sortOrder: "asc",
    breeds: [], // Initialize breeds as empty array
  });
  const breedOptions = breeds.map((breed) => ({ label: breed, value: breed }));

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await dogsAPI.getBreeds();
        setBreeds(response);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };
    fetchBreeds();
  },[]);

  const handleFilterChange = (key: keyof FilterParams, value: string | number | string[]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  }

  const handleUpdateDashboard = () => {
    updateFilters(filters);
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }

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
    <div className="bg-sidebar">
      <Sidebar className="py-4 px-2">
        <SidebarHeader>
          <h1 className="text-3xl text-foreground font-bold flex items-center justify-center">
            <span className="text-orange"><PiPawPrintFill /></span>Match
          </h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Breeds</SidebarGroupLabel>
            <SidebarGroupContent>
              <MultiSelect 
                options={breedOptions}
                value={filters.breeds}
                onValueChange={(selectedValues) => handleFilterChange('breeds', selectedValues)}
                animation={2}
                maxCount={1}
              />
            </SidebarGroupContent>

            <SidebarGroupLabel>Sort By</SidebarGroupLabel>
            <SidebarGroupContent>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Breed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breed">Breed</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="age">Age</SelectItem>
                </SelectContent>
              </Select>
            </SidebarGroupContent>

            <SidebarGroupLabel>Sort Order</SidebarGroupLabel>
            <SidebarGroupContent>
              <Select value={filters.sortOrder} onValueChange={(value) => handleFilterChange('sortOrder', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Ascending" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </SidebarGroupContent>

            <SidebarGroupLabel>Minimum Age</SidebarGroupLabel>
            <SidebarGroupContent>
              <Input type="number" value={filters.minAge} onChange={(e) => handleFilterChange('minAge', Number(e.target.value))} />
            </SidebarGroupContent>

            <SidebarGroupLabel>Maximum Age</SidebarGroupLabel>
            <SidebarGroupContent>
              <Input type="number" value={filters.maxAge} onChange={(e) => handleFilterChange('maxAge', Number(e.target.value))} />
            </SidebarGroupContent>

            <SidebarGroupContent>
              <Button variant="outline" onClick={handleUpdateDashboard} className="w-full mt-4">
                <MdFilterAlt />Apply filters
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button className="bg-orange" onClick={handleLogout}>
            <MdOutlineLogout /> Logout
          </Button>
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}