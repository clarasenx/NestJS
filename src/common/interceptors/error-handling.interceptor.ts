import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

export class ErrorHandlingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log("Error Handling started before");
    
    // await new Promise((resolve => setTimeout(resolve, 1000)));

    return next.handle().pipe(
      catchError(error => {
        return throwError(() => {
          if (error.name === 'NotFoundException') {
            return new BadRequestException(error.message);
          }
        });
      }),
    )
  }
}