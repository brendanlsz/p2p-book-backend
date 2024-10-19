import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the header

    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        throw new UnauthorizedException('Invalid token');
      }

      // extract email from the token and attach it to the request object
        req['user'] = user['email'];

      next(); // Proceed to the next middleware or route handler
    });
  }
}
