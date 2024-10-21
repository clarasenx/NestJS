import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

export class AuthTokenInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    console.log("Seu token é", token);

    return next.handle();
  }
}