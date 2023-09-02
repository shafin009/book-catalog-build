import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page?: number;
    limit?: number;
    total?: number;
    size?: number;
    totalPage?: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
