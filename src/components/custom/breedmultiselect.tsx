import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { dogsAPI } from "@/config/api";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BreedsMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

export function BreedsMultiSelect({ value, onChange, className }: BreedsMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [breeds, setBreeds] = useState<string[]>(["Affenpinscher"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breedsList = await dogsAPI.getBreeds();
        
        // Ensure we're setting an array, even if the API returns something unexpected
        if (Array.isArray(breedsList)) {
          setBreeds(breedsList);
        } else {
          console.error("API did not return an array of breeds:", breedsList);
          setBreeds([]);
        }
      } catch (error) {
        console.error("Failed to fetch breeds:", error);
        setBreeds([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBreeds();
  }, []);

  const handleSelect = (breed: string) => {
    const newValue = value.includes(breed)
      ? value.filter((item) => item !== breed)
      : [...value, breed];
    
    onChange(newValue);
  };

  const handleRemove = (breed: string) => {
    onChange(value.filter((item) => item !== breed));
  };

  const handleClear = () => {
    onChange([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {value.length > 0
            ? `${value.length} breed${value.length > 1 ? "s" : ""} selected`
            : "Select breeds..."}
          {value.length > 0 && (
            <X
              className="ml-2 h-4 w-4 opacity-50 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search breeds..." />
          <CommandEmpty>
            {loading ? "Loading breeds..." : "No breeds found."}
          </CommandEmpty>
          <ScrollArea className="h-60">
            <CommandGroup>
              {breeds.map((breed) => (
                <CommandItem
                  key={breed}
                  value={breed}
                  onSelect={() => handleSelect(breed)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(breed) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {breed}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {value.map((breed) => (
            <Badge key={breed} variant="secondary" className="flex items-center gap-1">
              {breed}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleRemove(breed)}
              />
            </Badge>
          ))}
        </div>
      )}
    </Popover>
  );
}