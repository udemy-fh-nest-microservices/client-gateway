import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const httpContext = host.switchToHttp();
    const response = httpContext.getResponse();

    const rpcError = exception.getError();

    if (rpcError.toString().toLowerCase().includes('empty response')) {
      return response.status(500).json({
        status: 500,
        message: rpcError.toString(),
      });
    }

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(rpcError.status as number) ? 400 : rpcError.status;

      return response.status(status).json(rpcError);
    }

    return response.status(400).json({
      status: 400,
      message: rpcError,
    });
  }
}
