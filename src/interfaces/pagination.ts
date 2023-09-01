export type IPaginationOptions = {
  page?: number;
  size?: number; 
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number; 
  maxPrice?: number;
  category?: string; 
  search?: string; 
};

export type BookFilterableFields = {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};
