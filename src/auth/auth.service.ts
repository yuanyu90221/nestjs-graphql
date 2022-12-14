import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models/user';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from '../bcrypt/bcrypt.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly bcryptService: BcryptService,
  ) {}

  validate(email: string, password: string): User | null {
    const user = this.usersService.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const passwordIsValid = this.bcryptService.compare(password, user.password);
    return passwordIsValid ? user : null;
  }
  login(user: User): { access_token: string } {
    const payload = {
      email: user.email,
      sub: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  verify(token: string): User {
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    const user = this.usersService.getUserByEmail(decoded.email);
    return user;
  }
}
