// src/users/users.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) {}
  private users: User[] = []; // Temporary in-memory storage

  async register(userData: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser: User = {
      ...userData,
      password: hashedPassword,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  login(email: string, password: string): { access_token: string } {
    const user = this.users.find((user) => user.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
      // return a jwt token valid for 1 hour
      return {
        access_token: this.jwtService.sign({ email: user.email }, { expiresIn: '1h', secret: process.env.JWT_SECRET }),
      };
    }
    throw new UnauthorizedException();
  }

  // validate jwt token
  validateToken(token: string):boolean {
    try {
      this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      return true;
    } catch (error) {
      return null;
    }
  }
}
