import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // return next.handle();
      const start = Date.now();
      return next.handle().pipe(
        tap(() => console.log(`Comming from intercaptor Execution time: ${Date.now() - start}ms`)),
      );
  }
}
