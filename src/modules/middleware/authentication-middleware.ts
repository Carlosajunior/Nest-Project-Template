import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const verifier = CognitoJwtVerifier.create({
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        tokenUse: 'id',
        clientId: process.env.COGNITO_CLIENT_ID,
      });
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        const token = req.headers.authorization.split(' ')[1];
        await verifier.verify(token);
        next();
      } else {
        res
          .status(401)
          .send(new UnauthorizedException('JWT token is missing.'));
      }
    } catch (error) {
      res.status(401).send(new UnauthorizedException(error));
    }
  }
}
