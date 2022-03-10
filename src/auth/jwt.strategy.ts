import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './dtos/jwt-payload.interface';
import { User } from './entities/user.entity';
import { UsersRepository } from './entities/users.repositories';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository) private userRepostitory: UsersRepository,
  ) {
    super({
      secretOrKey: 'topsecret2022',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepostitory.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
