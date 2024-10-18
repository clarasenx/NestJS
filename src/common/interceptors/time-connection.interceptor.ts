import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

export class TimeConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log("Timing Connection start");
    await new Promise((resolve => setTimeout(resolve, 1000)));

    return next.handle().pipe(
      tap(() => {
        console.log("Timing Connection Finished");
      })
    )
  }
}