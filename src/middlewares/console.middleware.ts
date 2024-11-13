import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class ConsoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //console.log(req.method, req.ip, req.params);
    console.log('run middleware... ');
    next();
  }
}
