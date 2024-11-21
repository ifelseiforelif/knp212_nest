import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class ConsoleMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(ConsoleMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    //console.log(req.method, req.ip, req.params);
    // console.log('run middleware... ');
    this.logger.log('run middleware');
    next();
  }
}
