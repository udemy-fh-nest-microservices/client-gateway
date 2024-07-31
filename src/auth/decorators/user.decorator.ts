import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

function getUserFromContext(data: unknown, context: ExecutionContext) {
  const request = context.switchToHttp().getRequest();

  if (!request.user) {
    throw new InternalServerErrorException(
      'User not found in request (Was the AuthGuard used?)',
    );
  }

  return request.user;
}

export const User = createParamDecorator(getUserFromContext);
