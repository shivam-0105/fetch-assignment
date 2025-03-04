import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelectedDogs } from '../contexts/SelectedDogsContext';
import { IoInformationCircleOutline } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { locationsAPI } from "@/config/api";
import { useState } from "react";
import { GrLocationPin } from "react-icons/gr";
import { Skeleton } from "@/components/ui/skeleton";

interface DogCardProps {
  dog: {
    id: string;
    img: string;
    name: string;
    age: number;
    breed: string;
    zip_code: string;
  }
}

export const DogCard = ({ dog }: DogCardProps) => {
  const { selectedDogs, toggleDog } = useSelectedDogs();
  const isSelected = selectedDogs.includes(dog.id);
  const [locationInfo, setLocationInfo] = useState<any>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [errorLocation, setErrorLocation] = useState<string | null>(null);

  const fetchLocationInfo = async () => {
    setLoadingLocation(true);
    setErrorLocation(null);
    try {
      const data = await locationsAPI.getLocations([dog.zip_code]);
      if (data && data.length > 0) {
        setLocationInfo(data[0]);
      } else {
        setLocationInfo(null);
      }
    } catch (error) {
      setErrorLocation("Failed to load location info");
    } finally {
      setLoadingLocation(false);
    }
  };



  return (
    <Card
      key={dog.id}
      className={`overflow-hidden transition hover:border-orange hover:shadow-lg ${isSelected ? 'border-orange' : ''}`}
      onClick={() => toggleDog(dog.id)}
    >
      <div className="h-64 overflow-hidden">
        <img
          src={dog.img}
          alt={dog.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/api/placeholder/400/300";
          }}
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="flex items-center justify-between">
          {dog.name}
          <Badge variant="outline" className="text-orange">{dog.breed}</Badge>
        </CardTitle>
        <CardDescription>
          {dog.age > 0 ? (dog.age > 1 ? `${dog.age} years old` : `${dog.age} year old`) : "New born"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground flex items-center justify-between gap-x-2">
          Zip Code: {dog.zip_code} 
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" onClick={fetchLocationInfo}>
                <IoInformationCircleOutline /> Location Info 
              </Button>
            </PopoverTrigger>
            <PopoverContent className="size-fit">
              {loadingLocation ? (
                  <Skeleton className="h-10 w-full" />
                ) : errorLocation ? (
                  <p>{errorLocation}</p>
                ) : locationInfo ? (
                  <div className="text-sm">
                    {locationInfo.city}, {locationInfo.state}
                    <br />
                    <GrLocationPin className="inline-block ml-1" /> {locationInfo.latitude}, {locationInfo.longitude}
                  </div>
                ) : (
                  <p>No location info found.</p>
                )}
            </PopoverContent>
          </Popover>
        </p>
      </CardContent>
    </Card>
  );
};
