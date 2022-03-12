import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger = new Logger();
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    this.logger.log(
      'Request ' +
        JSON.stringify({
          url: request.url,
          method: request.method,
          body: request.body,
        }),
    );
    const now = Date.now();
    return next.handle().pipe(
      tap((data) => {
        const executiontime: number = Date.now() - now;
        this.logger.log(
          'Response ' +
            JSON.stringify({
              data,
              executionTime: `${executiontime}ms`,
            }),
        );
      }),
    );
  }
}
