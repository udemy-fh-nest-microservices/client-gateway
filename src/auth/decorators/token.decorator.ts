import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

function getTokenFromContext(data: unknown, context: ExecutionContext) {
  const request = context.switchToHttp().getRequest();

  if (!request.token) {
    throw new InternalServerErrorException(
      'Token not found in request (Was the AuthGuard used?)',
    );
  }

  return request.token;
}

export const Token = createParamDecorator(getTokenFromContext);
