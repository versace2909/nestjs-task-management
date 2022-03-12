import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const logger = new Logger();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { statusCode, message } = exception.getResponse();
    logger.error(
      'Request ' +
        JSON.stringify({
          url: request.url,
          method: request.method,
          body: request.body,
          ...exception,
        }),
    );

    logger.error(exception.stack);
    response.status(statusCode).json({
      statusCode: statusCode,
      statusName: message,
    });
  }
}
