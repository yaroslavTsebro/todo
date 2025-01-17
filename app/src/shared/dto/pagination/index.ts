import { IsNumber, IsPositive } from 'class-validator';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export class PaginationQueryDto {
  @IsNumber()
  @IsPositive()
  page: number = 1;

  @IsNumber()
  @IsPositive()
  limit: number = 10;
}
