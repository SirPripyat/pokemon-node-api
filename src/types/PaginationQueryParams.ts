export type PaginationQueryParams = {
  page: number;
  search: string;
};

export type PaginationQueryParamsWithTypes = PaginationQueryParams & {
  types: string;
};
