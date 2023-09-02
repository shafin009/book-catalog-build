export type IPaginationOption = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};
export type IGenericResponse<T> = {
  meta: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  data: T;
};
export type IAcademicSemesterFilters = {
  searchTerm?: string;
};
import { SortOrder } from 'mongoose';

export type IOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};
export type IOptionsResult = {
  page: number;
  size: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
