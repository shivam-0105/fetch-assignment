import { createContext, useContext, useState, ReactNode } from 'react';

export interface FilterParams {
  sortBy: string;
  sortOrder: string;
  minAge: number;
  maxAge: number;
}

const defaultFilters: FilterParams = {
  sortBy: 'breed',
  sortOrder: 'asc',
  minAge: 0,
  maxAge: 100,
};

interface FilterContextType {
  filters: FilterParams;
  updateFilters: (newFilters: FilterParams) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }): JSX.Element {
  const [filters, setFilters] = useState<FilterParams>(defaultFilters);

  const updateFilters = (newFilters: FilterParams) => {
    setFilters(newFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters(): FilterContextType {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
