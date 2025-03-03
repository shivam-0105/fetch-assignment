import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelectedDogs } from '../contexts/SelectedDogsContext';

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
        <p className="text-sm text-muted-foreground">
          Location: {dog.zip_code}
        </p>
      </CardContent>
    </Card>
  );
};
