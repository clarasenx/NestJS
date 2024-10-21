import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response  } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next:NextFunction) {
    console.log("SimpleMiddleware: Olá");

    // return res.status(404).send({
    //   message: "Não encontrado",
    // });

    next();

    console.log("SimpleMiddleware: Tchau");
  }
}