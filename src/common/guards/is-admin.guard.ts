import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request['user']?.role;

    if(role === "admin") {
      console.log("Rota acessada");
      return true; //pode acessar a rota
    }
    console.log("Rota NÂO acessada");
    return false; //não pode acessar a rota
  }
}