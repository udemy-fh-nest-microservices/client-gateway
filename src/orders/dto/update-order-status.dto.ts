import { IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/order-status.enum';

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus, {
    message: `Status must be one of ${Object.values(OrderStatus)}`,
  })
  status: OrderStatus;
}
