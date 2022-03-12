import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SecondMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    console.log('Second Middleware');
    next();
    console.log('After Second Middleware');
  }
}
