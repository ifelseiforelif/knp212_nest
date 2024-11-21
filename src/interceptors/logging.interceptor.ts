import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Logger,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { MainService } from 'src/services/main.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  constructor(@Inject(MainService) private readonly mainService: MainService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url } = request;
    this.mainService.setUserId('5');
    this.logger.debug(this.mainService.getUserId());
    this.logger.log(
      `${method} ${url} ${userAgent} ${ip}: ${context.getClass().name} ${
        context.getHandler().name
      } invoked...`,
    );
    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;
        const contentLength = response.get('content-length');

        this.logger.log(
          `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}: ${
            Date.now() - now
          }ms`,
        );
        this.logger.debug('Response:', res);
      }),
    );
  }
}
