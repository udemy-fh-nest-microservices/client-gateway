import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto';
import { OrderStatus } from '../enum/order-status.enum';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `status must be one of the following: ${Object.values(OrderStatus)}`,
  })
  status?: OrderStatus;
}
