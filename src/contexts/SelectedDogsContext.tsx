import { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from 'sonner';

interface SelectedDogsContextType {
  selectedDogs: string[];
  toggleDog: (dogId: string) => void;
  resetSelectedDogs: () => void;
}

const SelectedDogsContext = createContext<SelectedDogsContextType | undefined>(undefined);

export const SelectedDogsProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [selectedDogs, setSelectedDogs] = useState<string[]>([]);

  const toggleDog = (dogId: string) => {
    if (selectedDogs.includes(dogId)) {
      setSelectedDogs(selectedDogs.filter(id => id !== dogId));
    } else {
      setSelectedDogs([...selectedDogs, dogId]);
    }
  };

  const resetSelectedDogs = () => {
    setSelectedDogs([]);
    toast.success("Selected dogs reset.");
  };


  return (
    <SelectedDogsContext.Provider value={{ selectedDogs, toggleDog, resetSelectedDogs }}>
      {children}
    </SelectedDogsContext.Provider>
  );
};

export const useSelectedDogs = (): SelectedDogsContextType => {
  const context = useContext(SelectedDogsContext);
  if (!context) {
    throw new Error('useSelectedDogs must be used within a SelectedDogsProvider');
  }
  return context;
};
