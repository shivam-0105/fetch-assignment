import { useState } from "react"
import { authAPI } from "@/config/api"
import { useNavigate } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
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
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input"

interface FilterParams {
  sortBy: string;
  sortOrder: string;
  minAge: number;
  maxAge: number;
}

interface AppSidebarProps {
  onFilterChange?: (params: FilterParams) => void;
}

export function AppSidebar({ onFilterChange }: AppSidebarProps) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterParams>({
    minAge: 1,
    maxAge: 100,
    sortBy: "breed",
    sortOrder: "asc",
  });

  const handleFilterChange = (key: keyof FilterParams, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
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
      <Sidebar className="p-6 border">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel><h1 className="text-3xl font-bold flex items-center"><span className="text-orange"><PiPawPrintFill /></span>Match</h1></SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                        <Label>Sort By</Label>
                        <SelectTrigger>
                          <SelectValue placeholder="Breed" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breed">Breed</SelectItem>
                          <SelectItem value="name">Name</SelectItem>
                          <SelectItem value="age">Age</SelectItem>
                        </SelectContent>
                      </Select>
                    </SidebarMenuButton>
                    <SidebarMenuButton asChild>
                      <Select value={filters.sortOrder} onValueChange={(value) => handleFilterChange('sortOrder', value)}>
                        <Label>Sort Order</Label>
                        <SelectTrigger>
                          <SelectValue placeholder="Ascending" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asc">Ascending</SelectItem>
                          <SelectItem value="desc">Descending</SelectItem>
                        </SelectContent>
                      </Select>
                    </SidebarMenuButton>
                    <SidebarMenuButton asChild>
                      <>
                        <Label>Minimum Age</Label>
                        <Input type="number" value={filters.minAge} onChange={(e) => handleFilterChange('minAge', Number(e.target.value))} />
                      </>
                    </SidebarMenuButton>
                    <SidebarMenuButton asChild>
                      <>
                        <Label>Maximum Age</Label>
                        <Input type="number" value={filters.maxAge} onChange={(e) => handleFilterChange('maxAge', Number(e.target.value))} />
                      </>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button className="bg-orange" onClick={handleLogout}>
                  <MdOutlineLogout /> Logout
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}
