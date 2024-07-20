import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../enum/order-status.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `$property must be one of ${Object.values(OrderStatus)}`,
  })
  status: OrderStatus;
}
