import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <Card key={dog.id} className="overflow-hidden">
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
        <CardTitle>{dog.name}</CardTitle>
        <CardDescription>{dog.breed} • {dog.age > 0 ? (dog.age > 1 ? `${dog.age} years old` : `${dog.age} year old`) : "New born"}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">
          Location: {dog.zip_code}
        </p>
      </CardContent>
    </Card>
  );
};
