export type IBookFilterRequest = {
  search?: string | undefined;

  category: string | undefined;
};

export const BookSearchAbleFields = ['title', 'author', 'genre'];

export const BookFilterAbleFileds = [
  'search',
  'category',
  'minPrice',
  'maxPrice',
];
