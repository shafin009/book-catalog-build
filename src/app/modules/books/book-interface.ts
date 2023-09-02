export type IBookFilterRequest = {
  search?: string | undefined;

  category: string | undefined;
};

export const BookSearchField = ['title', 'author', 'genre'];

export const BookFilterField = ['search', 'category', 'minPrice', 'maxPrice'];
